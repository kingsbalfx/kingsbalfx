# Deployment & Production Checklist

This file was added by an automated fix pass. It contains safe steps to ensure your app builds with correct production URLs and env variables.

## 1. Set production environment variables
Populate `.env.production` with real secrets and production domain values. Required vars (minimum):

- PUBLIC_BASE_URL=https://your-production-domain.com
- NEXT_PUBLIC_API_URL=https://your-production-domain.com/api
- PAYSTACK_SECRET_KEY_LIVE=sk_live_xxx
- NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY_LIVE=pk_live_xxx
- SUPABASE_URL=...
- SUPABASE_SERVICE_KEY=...
- SUPABASE_ANON_KEY=...
- MAILCHIMP_API_KEY=...
- MAILCHIMP_LIST_ID=...
- PAYSTACK_WEBHOOK_SECRET=...

## 2. Local production build (test locally)
Run locally to verify production build uses correct prod URLs:

```bash
# on Unix (macOS / Linux)
NODE_ENV=production PUBLIC_BASE_URL=https://your-production-domain.com npm ci
NODE_ENV=production PUBLIC_BASE_URL=https://your-production-domain.com npm run build
NODE_ENV=production PUBLIC_BASE_URL=https://your-production-domain.com npm run start

# on Windows (PowerShell)
$env:NODE_ENV='production'; $env:PUBLIC_BASE_URL='https://your-production-domain.com'; npm ci
$env:NODE_ENV='production'; $env:PUBLIC_BASE_URL='https://your-production-domain.com'; npm run build
$env:NODE_ENV='production'; $env:PUBLIC_BASE_URL='https://your-production-domain.com'; npm run start
```

## 3. Vercel deployment
- In Vercel project settings, set the same environment variables (Production scope).
- Ensure vercel.json does NOT contain a `builds` array. If it does, remove the `builds` key so Vercel uses the Next.js official builder.
- Push to GitHub branch linked to Vercel to trigger a deploy.

## 4. What I changed (non-destructive)
- Replaced hard-coded `localhost` usage in `pages/api/pay-initiate.js` with `process.env.PUBLIC_BASE_URL` fallback.
- Added `pages/login.js` and `pages/index.js` earlier to prevent root 404.
- Added `.env.production` with placeholders.
- Added this deployment checklist README (`README_DEPLOYMENT.md`).

If you want, I can also replace any other `localhost` hardcoding or pin Node engine version. Let me know which Node version you prefer (e.g., 18.17.0 or keep 20.x).
