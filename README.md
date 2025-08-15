# KING_S_BALFX - Next (Upgraded)

This package is an upgraded Next.js project with monetization features and an admin command center.

## Included features
- Next.js pages: Home, Free, Premium, Admin, VIP
- Paystack integration for one-time payments and recurring subscriptions (server code present)
- Mailchimp newsletter integration (placeholder; add keys in Admin or .env)
- Referral tracking via `?ref=...`
- Admin command center at `/admin` (password protected)
- Local data storage in `data/` (admin settings & subscribers) — DB-ready for later

## Setup (local)
1. `npm install`
2. Copy `.env.example` to `.env.local` and add keys:
```
ADMIN_PASSWORD=your_admin_password
PAYSTACK_SECRET_KEY=your_paystack_key
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id
```
3. `npm run dev` (development) or `npm run build` then `npm start` (production)

## Admin
- Open `/admin`
- Default admin password is `changeme` (change it immediately via the admin command: `update admin password to YOUR_PASS`)
- Admin commands (examples):
  - `update mailchimp key to <KEY>`
  - `update mailchimp list to <LIST_ID>`
  - `send email to all "Subject" "Message body..."`
  - `create paystack plan <name> <amount>`

## Deployment to Vercel
- Add environment variables on Vercel (Project Settings -> Environment Variables)
  - `ADMIN_PASSWORD`, `PAYSTACK_SECRET_KEY`, `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`
- Deploy as a Next.js project. Vercel will run `npm run build` automatically.
### Admin Mode Toggle
- Switch between **Demo** and **Live** from the Admin panel (top-right).
- Mode persists in `data/settings.json`.
- Live calls real integrations if env keys are set in `.env.local`.

### VIP Flow
- **Demo**: `/api/pay` redirects to `/success?ref=DEMO_...&email=...` → `/api/paystack-verify` stores VIP locally.
- **Live**: After Paystack payment, direct users to `/success?ref=...&email=...` and verification will confirm via Paystack.
- Admin → shows a **VIP Users** section (export CSV).


## Upgrades applied
- Supabase storage adapter with FS fallback (see `lib/storage.js`).
- Paystack webhook endpoint `/api/paystack-webhook` with signature verification.
- Server-side Mailchimp subscribe (`/api/newsletter`).
- GitHub Actions CI workflow `.github/workflows/ci.yml`.

See `.env.example` for new env variables and `UPGRADE_NOTES.md` for next steps.


## Extra upgrades applied
- Added `migrations/supabase_init.sql` — run this in Supabase SQL editor to create required tables.
- Admin UI page `/admin-supabase` to view Supabase status, fetch migration SQL, and run a small write test.
- Added `/api/pay-initiate` for server-side Paystack initialization (live) or demo flow.
- Enhanced webhook `/api/paystack-webhook` for idempotency and raw event storage.
- GitHub Actions deployment workflow `/.github/workflows/deploy.yml` — requires GitHub secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

### Running migrations
1. Go to your Supabase project → SQL Editor → run the SQL in `migrations/supabase_init.sql`.
2. Or run it via psql if you have direct DB access.

### Admin page
Visit `/admin-supabase` (password-protect your admin UI in production) to check status and see migration SQL.
