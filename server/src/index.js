import mongoose from 'mongoose';
import { config } from './config.js';
import { createApp } from './app.js';

if (!config.mongoUri) {
  console.error('MONGODB_URI is not set. Copy server/.env.example to server/.env and fill it in.');
  process.exit(1);
}

try {
  await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 8000 });
  console.log('MongoDB connected');
} catch (e) {
  console.error('Could not connect to MongoDB:', e.message);
  process.exit(1);
}

const server = createApp().listen(config.port, () => console.log(`TAIPOGRAPH API on http://localhost:${config.port}`));

const shutdown = () => server.close(() => mongoose.connection.close().then(() => process.exit(0)));
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
