import multer from 'multer';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { ALLOWED_EXT } from '../constants.js';
import { config } from '../config.js';

fs.mkdirSync(config.uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, config.uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).slice(1).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${ext}`);
  },
});

const uploader = multer({
  storage,
  limits: { fileSize: config.uploadMaxBytes, files: 1, fields: 12, fieldSize: 20 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).slice(1).toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) {
      const err = new Error(`File type .${ext || '?'} is not supported. Allowed: ${ALLOWED_EXT.join(', ')}.`);
      err.code = 'BAD_FILE_TYPE';
      return cb(err);
    }
    cb(null, true);
  },
}).single('file');

/** Runs multer and turns its errors into friendly 400 responses. */
export function handleUpload(req, res, next) {
  uploader(req, res, (err) => {
    if (!err) return next();
    let message = 'Upload failed.';
    if (err.code === 'LIMIT_FILE_SIZE') message = `File is too large. Maximum size is ${Math.round(config.uploadMaxBytes / 1048576)} MB.`;
    else if (err.code === 'BAD_FILE_TYPE') message = err.message;
    else if (err instanceof multer.MulterError) message = 'Please attach a single file.';
    else return next(err);
    res.status(400).json({ ok: false, message, errors: { file: message } });
  });
}

export function removeUpload(file) {
  if (file && file.path) fs.unlink(file.path, () => {});
}
