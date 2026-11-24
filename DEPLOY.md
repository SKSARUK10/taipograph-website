# Free deployment: Netlify (website) + Render (API) + MongoDB Atlas (database)

Why this split: the website is static and never sleeps on Netlify. Render's free API sleeps after 15 min idle
(about 1 min to wake), so only the form submit can be slow, and the Contact page pre-wakes it.

## 1. MongoDB Atlas (database)
1. Create a free cluster (Free / M0). Create a database user with a strong password.
2. Network Access → Add IP `0.0.0.0/0` (Render free has no fixed IP; the password protects it).
3. Connect → Drivers → copy the URI and add the db name:
   `mongodb+srv://USER:PASS@cluster.mongodb.net/taipograph?retryWrites=true&w=majority`

## 2. Render (API)
New → Web Service → connect the GitHub repo.
- Root Directory: `server`   · Build: `npm install`   · Start: `npm start`   · Instance: Free
- Health Check Path: `/api/health`
- Environment: `MONGODB_URI` (from step 1), `NODE_ENV=production`, `TRUST_PROXY=1`,
  `UPLOAD_MAX_MB=25`, `CLIENT_ORIGIN=https://YOUR-SITE.netlify.app` (add your custom domain too, comma separated)
- Deploy, then open `https://YOUR-API.onrender.com/api/health` → `{"ok":true,"db":"connected"}`

## 3. Netlify (website)
Add new site → Import from GitHub.
- Base directory: `client`   · Build command: `npm run build`   · Publish directory: `client/dist`
- Environment variables: `VITE_API_URL=https://YOUR-API.onrender.com/api`, `VITE_UPLOAD_MAX_MB=25`,
  optionally the three `VITE_EMAILJS_*` values, and `VITE_WHATSAPP_NUMBER` (e.g. `918479050435`, digits only).
- `client/public/_redirects` makes /about, /services... work on refresh.
- Vite bakes variables in at build time: after changing one, trigger "Clear cache and deploy".

## 4. Test
Submit the form on the live site, then check the `enquiries` collection in Atlas.

## Important limits of the free setup
- **Uploaded files are NOT kept on Render's free plan** (the disk is wiped on every redeploy/restart/sleep).
  Before relying on the free preflight upload, move storage to Cloudflare R2, S3 or Cloudinary.
- Render says free instances are for testing and hobby use, not production.
- Atlas Free: 0.5 GB, pauses after 30 days with no connections.
