import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Enquiry, { makeRef } from '../models/Enquiry.js';
import { handleUpload, removeUpload } from '../middleware/upload.js';
import { validateEnquiry } from '../utils/validate.js';

const router = Router();

// 8 submissions / 15 min / IP: plenty for people, painful for bots.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, message: 'Too many submissions. Please wait a few minutes or email us directly.' },
});

router.post('/', limiter, handleUpload, async (req, res, next) => {
  const file = req.file;
  try {
    // Honeypot: real visitors never see/fill this field. Pretend success, store nothing.
    if (req.body && req.body.website) {
      removeUpload(file);
      return res.status(201).json({ ok: true, ref: '' });
    }

    const { values, errors } = validateEnquiry(req.body);
    if (Object.keys(errors).length) {
      removeUpload(file);
      return res.status(400).json({ ok: false, message: 'Please check the highlighted fields.', errors });
    }

    const doc = {
      ...values,
      ip: req.ip,
      userAgent: String(req.get('user-agent') || '').slice(0, 300),
      file: file
        ? { originalName: file.originalname.slice(0, 200), storedName: file.filename, mimeType: file.mimetype, size: file.size }
        : undefined,
    };

    let saved;
    for (let attempt = 0; attempt < 3 && !saved; attempt++) {
      try {
        saved = await Enquiry.create({ ...doc, ref: makeRef() });
      } catch (e) {
        if (e && e.code === 11000 && attempt < 2) continue; // ref collision: try a new one
        throw e;
      }
    }
    res.status(201).json({ ok: true, ref: saved.ref });
  } catch (err) {
    removeUpload(file);
    next(err);
  }
});

export default router;
