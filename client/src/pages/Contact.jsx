import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CONTACT, SEO, SITE } from '../data/content.js';
import useSeo from '../hooks/useSeo.js';
import { Icon } from '../components/Icons.jsx';
import { ALLOWED_EXT, ApiError, MAX_MB, checkFile, submitEnquiry, warmUpApi } from '../lib/api.js';
import { openMailto, sendEmailJs } from '../lib/email.js';
import { whatsappHref } from '../lib/whatsapp.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: '', email: '', company: '', service: CONTACT.services[0].value, message: '', website: '' };

const fmtSize = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

export default function Contact() {
  useSeo(SEO.contact);
  const [params] = useSearchParams();
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | fallback
  const [ref, setRef] = useState('');
  const [drag, setDrag] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInput = useRef(null);
  const live = useRef(null);

  // Free hosts put the API to sleep; wake it as soon as someone opens the form.
  useEffect(() => { warmUpApi(); }, []);

  // Links elsewhere on the site use /contact?service=preflight etc.
  useEffect(() => {
    const match = CONTACT.services.find((s) => s.key === params.get('service'));
    if (match) setForm((f) => ({ ...f, service: match.value }));
  }, [params]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const pick = (f) => {
    if (!f) return;
    const problem = checkFile(f);
    if (problem) {
      setFile(null);
      setErrors((x) => ({ ...x, file: problem }));
      return;
    }
    setFile(f);
    setErrors((x) => ({ ...x, file: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!EMAIL_RE.test(form.email.trim())) e.email = 'Please enter a valid work email.';
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (status === 'sending') return;
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);

    setStatus('sending');
    const fields = { ...form, name: form.name.trim(), email: form.email.trim(), company: form.company.trim() };
    let savedRef = '';
    let saved = false;

    try {
      const res = await submitEnquiry(fields, file);
      saved = true;
      savedRef = res.ref || '';
    } catch (err) {
      if (err instanceof ApiError && err.status === 400 && err.errors) {
        setErrors(err.errors);
        setStatus('idle');
        return;
      }
      if (err instanceof ApiError && err.status === 429) {
        setErrors({ form: 'Too many submissions from your network. Please wait a few minutes or email us directly.' });
        setStatus('idle');
        return;
      }
      // network down / server error: continue, the email step below is the safety net
    }

    // Frontend email notification (EmailJS). Optional; never blocks the form.
    const emailed = await sendEmailJs(fields, file, savedRef);

    if (saved || emailed) {
      setRef(savedRef);
      setStatus('done');
      setForm(EMPTY);
      setFile(null);
      setErrors({});
      requestAnimationFrame(() => live.current && live.current.focus());
    } else {
      // Nothing reached us: fall back to the original mailto behaviour so no lead is lost.
      setStatus('fallback');
      openMailto(fields, file, savedRef);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  const sending = status === 'sending';

  return (
    <>
      <div className="ph">
        <div className="w">
          <div className="eye">{CONTACT.header.eyebrow}</div>
          <h1 style={{ fontSize: 'clamp(1.6rem,3.6vw,2.4rem)', margin: '12px 0 10px' }}>{CONTACT.header.h1}</h1>
          <h2 style={{ fontSize: 'clamp(1.6rem,3.6vw,2.4rem)', lineHeight: 1.12, margin: '0 0 18px' }}>{CONTACT.header.h2}</h2>
          <p>{CONTACT.header.text}</p>
        </div>
      </div>

      <section>
        <div className="w two">
          <div>
            <h2>{CONTACT.intro.title}</h2>
            <p>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <button type="button" className="lnk cp" onClick={copyEmail} aria-live="polite">
                <Icon name="copy" className="ic cpi" />{copied ? 'Copied' : 'Copy'}
              </button>
              <br />
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <br />
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              <br />
              <span style={{ color: 'var(--mute)' }}>{CONTACT.intro.location}</span>
            </p>
            <p style={{ color: 'var(--mute)', marginTop: 14 }}>{CONTACT.intro.note}</p>
          </div>

          <div>
            {status === 'done' ? (
              <div className="ok" role="status" tabIndex={-1} ref={live}>
                <Icon name="appr" className="ic big" />
                <h3>Thank you, we have your enquiry.</h3>
                <p>You will hear back within one business day.</p>
                {ref && <p className="refno">Reference: <b>{ref}</b></p>}
                <button type="button" className="btn o" onClick={() => setStatus('idle')}>Send another</button>
              </div>
            ) : (
              <form id="f" onSubmit={onSubmit} noValidate aria-busy={sending}>
                <div className="fld">
                  <input id="n" name="name" placeholder="Your name" aria-label="Your name" autoComplete="name"
                    value={form.name} onChange={set('name')} aria-invalid={!!errors.name} required />
                  {errors.name && <small className="err">{errors.name}</small>}
                </div>
                <div className="fld">
                  <input id="e" name="email" type="email" placeholder="Work email" aria-label="Work email" autoComplete="email"
                    value={form.email} onChange={set('email')} aria-invalid={!!errors.email} required />
                  {errors.email && <small className="err">{errors.email}</small>}
                </div>
                <div className="fld">
                  <input id="c" name="company" placeholder="Company" aria-label="Company" autoComplete="organization"
                    value={form.company} onChange={set('company')} />
                  {errors.company && <small className="err">{errors.company}</small>}
                </div>
                <select id="t" name="service" aria-label="Service" value={form.service} onChange={set('service')}>
                  {CONTACT.services.map((s) => (
                    <option key={s.key} value={s.value}>{s.value}</option>
                  ))}
                </select>
                <div className="fld">
                  <textarea id="m" name="message" rows="4" placeholder="Project details, deadline, print process" aria-label="Project details"
                    value={form.message} onChange={set('message')} />
                  {errors.message && <small className="err">{errors.message}</small>}
                </div>

                {/* Free preflight: one optional artwork file */}
                <div className="fld">
                  <label
                    className={`drop${drag ? ' over' : ''}${file ? ' has' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files && e.dataTransfer.files[0]); }}
                  >
                    <Icon name="upload" />
                    {file ? (
                      <span><b>{file.name}</b> · {fmtSize(file.size)}</span>
                    ) : (
                      <span><b>Attach one artwork file</b> for a free preflight (optional)<br />
                        <small>Drag &amp; drop or click · max {MAX_MB} MB · {ALLOWED_EXT.join(', ')}</small></span>
                    )}
                    <input ref={fileInput} type="file" name="file" hidden
                      accept={ALLOWED_EXT.map((x) => '.' + x).join(',')}
                      onChange={(e) => pick(e.target.files && e.target.files[0])} />
                  </label>
                  {file && (
                    <button type="button" className="lnk" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = ''; }}>
                      Remove file
                    </button>
                  )}
                  {errors.file && <small className="err">{errors.file}</small>}
                </div>

                {/* Honeypot: hidden from people, bots fill it in */}
                <div className="hp" aria-hidden="true">
                  <label>Leave this empty<input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={set('website')} /></label>
                </div>

                {errors.form && <small className="err" role="alert">{errors.form}</small>}
                {status === 'fallback' && (
                  <p className="note" role="alert">
                    We could not reach our server, so your email app should have opened with the details. If it did not,
                    please write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                  </p>
                )}

                <button className="btn" type="submit" disabled={sending}>
                  {sending ? (file ? 'Uploading…' : 'Sending…') : 'Send enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
