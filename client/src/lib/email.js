import { SITE } from '../data/content.js';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const emailJsEnabled = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

function summary(f, file, ref) {
  return [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Company: ${f.company || '-'}`,
    `Service: ${f.service}`,
    file ? `Attachment: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` : 'Attachment: none',
    ref ? `Reference: ${ref}` : '',
    '',
    f.message || '',
  ].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
}

/**
 * Frontend-side email notification through EmailJS' REST API (no SDK needed).
 * In the EmailJS template use these variables:
 *   {{from_name}} {{reply_to}} {{company}} {{service}} {{message}} {{reference}} {{attachment}} {{subject}}
 * Returns true/false; never throws, so a failed email can't block the form.
 */
export async function sendEmailJs(fields, file, ref) {
  if (!emailJsEnabled) return false;
  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: {
          subject: `Enquiry: ${fields.service}`,
          from_name: fields.name,
          reply_to: fields.email,
          company: fields.company || '-',
          service: fields.service,
          message: fields.message || '',
          reference: ref || '',
          attachment: file ? file.name : 'none',
          to_email: SITE.email,
        },
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Last-resort fallback (the original site's behaviour): open the visitor's mail app. */
export function openMailto(fields, file, ref) {
  const href =
    `mailto:${SITE.email}?subject=${encodeURIComponent('Enquiry: ' + fields.service)}` +
    `&body=${encodeURIComponent(summary(fields, file, ref))}`;
  window.location.href = href;
}
