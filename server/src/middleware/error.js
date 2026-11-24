export function notFound(req, res) {
  res.status(404).json({ ok: false, message: 'Not found.' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error('[error]', err);
  res.status(err.status || 500).json({ ok: false, message: 'Something went wrong on our side. Please try again or email us directly.' });
}
