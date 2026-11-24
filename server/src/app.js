import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';
import { config } from './config.js';
import enquiries from './routes/enquiries.js';
import { errorHandler, notFound } from './middleware/error.js';

export function createApp() {
  const app = express();
  app.set('trust proxy', config.trustProxy);
  app.disable('x-powered-by');

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https://api.emailjs.com'], // frontend email (EmailJS)
          'upgrade-insecure-requests': null,
        },
      },
    })
  );
  if (config.clientOrigins.length) app.use(cors({ origin: config.clientOrigins, methods: ['GET', 'POST'] }));
  app.use(express.json({ limit: '20kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
  });
  app.use('/api/enquiries', enquiries);
  app.use('/api', notFound);

  // Production: serve the built React app and fall back to index.html for client-side routes.
  if (fs.existsSync(path.join(config.clientDist, 'index.html'))) {
    app.use(express.static(config.clientDist, { index: false, maxAge: '1h' }));
    app.get('*', (_req, res) => res.sendFile(path.join(config.clientDist, 'index.html')));
  }

  app.use(errorHandler);
  return app;
}
