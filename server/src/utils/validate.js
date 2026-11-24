import { SERVICES } from '../constants.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// strip control characters (keep \n and \t in the message)
const clean = (v, keepNewlines = false) =>
  String(v ?? '')
    .replace(keepNewlines ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, '')
    .trim();

/** Validates & normalises the enquiry body. Returns { values, errors }. */
export function validateEnquiry(body = {}) {
  const values = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    company: clean(body.company),
    service: clean(body.service),
    message: clean(body.message, true),
  };
  const errors = {};

  if (!values.name) errors.name = 'Please enter your name.';
  else if (values.name.length > 100) errors.name = 'Name is too long (max 100 characters).';

  if (!values.email || !EMAIL_RE.test(values.email) || values.email.length > 254) errors.email = 'Please enter a valid work email.';

  if (values.company.length > 120) errors.company = 'Company name is too long (max 120 characters).';

  if (!SERVICES.includes(values.service)) errors.service = 'Please choose a service from the list.';

  if (values.message.length > 5000) errors.message = 'Message is too long (max 5000 characters).';

  return { values, errors };
}
