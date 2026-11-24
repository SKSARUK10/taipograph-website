import mongoose from 'mongoose';
import crypto from 'node:crypto';

const fileSchema = new mongoose.Schema(
  {
    originalName: String,
    storedName: String, // random name on disk (never the user's filename)
    mimeType: String,
    size: Number,
  },
  { _id: false }
);

const enquirySchema = new mongoose.Schema(
  {
    ref: { type: String, unique: true, index: true },
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, maxlength: 254, index: true },
    company: { type: String, default: '', maxlength: 120 },
    service: { type: String, required: true },
    message: { type: String, default: '', maxlength: 5000 },
    file: { type: fileSchema, default: undefined },
    // Ready for the future admin backend:
    status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new', index: true },
    ip: String,
    userAgent: String,
  },
  { timestamps: true }
);

export function makeRef() {
  const d = new Date();
  const ymd = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `TPG-${ymd}-${rand}`;
}

export default mongoose.model('Enquiry', enquirySchema);
