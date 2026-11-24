# TAIPOGRAPH – MERN website

React (Vite) client + Express/Mongoose API. Same theme as the original static site (navy `#0a2342`, orange `#e8590c`, auto dark mode).

## Pages (5)
Home `/` · About `/about` · Services `/services` · Portfolio & Case Studies `/portfolio` · Contact `/contact` (+ 404). Old `*.html` URLs still work.

## Run it
1. Requires Node 18+ and MongoDB (local or Atlas).
2. `npm run install:all`
3. `cp server/.env.example server/.env` (set `MONGODB_URI`) and `cp client/.env.example client/.env`
4. `npm run dev` → site at http://localhost:5173, API at http://localhost:5000

Production: `npm run build` then `npm start` (Express serves `client/dist` and the API on one port).
Tests: `npm test` (server validation).

## How it works
- **Copy** lives in `client/src/data/content.js` (moved word-for-word from your HTML). Edit text there.
- **Contact form** → `POST /api/enquiries` (multipart). Saved in MongoDB (`Enquiry` model, status `new`, ready for a future admin backend). Optional single artwork file for the free preflight is stored in `server/uploads/` under a random name (not publicly served).
- **Email (frontend side)**: set the three `VITE_EMAILJS_*` values and each enquiry also emails you via EmailJS (template variables are listed in `client/src/lib/email.js`). If the API is unreachable and email isn't configured, it falls back to the original `mailto:` so no lead is lost.
- **Security**: helmet, rate limit (8 / 15 min / IP), honeypot field, file-type whitelist, size limit, input validation.

## Extras added (theme unchanged)
Light/dark toggle, per-page SEO tags, scroll-reveal and stat count-up (respect reduced motion), `?service=` prefill on CTA links, drag-and-drop upload, 404 page, skip link.
