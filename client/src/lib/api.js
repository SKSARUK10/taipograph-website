const API = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export const MAX_MB = Number(import.meta.env.VITE_UPLOAD_MAX_MB) || 25;
// Keep in sync with server/src/config.js
export const ALLOWED_EXT = ['pdf', 'ai', 'eps', 'psd', 'indd', 'idml', 'cdr', 'svg', 'jpg', 'jpeg', 'png', 'tif', 'tiff', 'zip'];

export class ApiError extends Error {
  constructor(message, { status = 0, errors = null, network = false } = {}) {
    super(message);
    this.status = status;
    this.errors = errors; // { field: message } from server validation (HTTP 400)
    this.network = network; // true when the server could not be reached at all
  }
}

export function checkFile(file) {
  if (!file) return null;
  const ext = file.name.split('.').pop().toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) return `File type .${ext} is not supported. Allowed: ${ALLOWED_EXT.join(', ')}.`;
  if (file.size > MAX_MB * 1024 * 1024) return `File is too large. Maximum size is ${MAX_MB} MB.`;
  return null;
}

export async function submitEnquiry(fields, file) {
  const body = new FormData();
  Object.entries(fields).forEach(([k, v]) => body.append(k, v ?? ''));
  if (file) body.append('file', file);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 90_000); // large uploads on slow links
  let res;
  try {
    res = await fetch(`${API}/enquiries`, { method: 'POST', body, signal: ctrl.signal });
  } catch (e) {
    throw new ApiError('Could not reach the server.', { network: true });
  } finally {
    clearTimeout(timer);
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (!res.ok) {
    throw new ApiError((data && data.message) || `Request failed (${res.status}).`, {
      status: res.status,
      errors: data && data.errors,
    });
  }
  return data; // { ok: true, ref: 'TPG-...' }
}

/** Wakes a sleeping free-tier API (Render) while the visitor is still filling in the form. Fire-and-forget. */
export function warmUpApi() {
  fetch(`${API}/health`, { method: 'GET', cache: 'no-store' }).catch(() => {});
}
