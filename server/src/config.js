import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  port: Number(process.env.PORT) || 5000,
  isProd: process.env.NODE_ENV === 'production',
  mongoUri: process.env.MONGODB_URI || '',
  clientOrigins: (process.env.CLIENT_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean),
  trustProxy: Number(process.env.TRUST_PROXY) || 0,
  uploadMaxBytes: (Number(process.env.UPLOAD_MAX_MB) || 25) * 1024 * 1024,
  uploadDir: path.resolve(__dirname, '../uploads'),
  clientDist: path.resolve(__dirname, '../../client/dist'),
};

export { ALLOWED_EXT, SERVICES } from './constants.js';
