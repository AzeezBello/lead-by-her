# The Giving Back Project

A production-ready NGO website starter built with Next.js, TypeScript, Tailwind CSS, ShadCN-ready UI patterns, Supabase and Paystack.

## What's included

- Responsive public NGO website
- About, team, leadership and board structure
- Programs, projects and campaigns
- Blog and events
- Volunteer and contact flows
- Donation UI with Paystack integration points
- Supabase schema with RLS policies
- Supabase password authentication
- Protected admin dashboard
- Admin CRUD for programs, projects, campaigns, blog posts, team, board and events
- Admin views for donations, volunteers and messages
- Placeholder seed content

## Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. In Supabase Authentication, create the first admin user with email/password.
4. In SQL Editor, promote that user after creation:

```sql
update public.profiles
set role = 'super_admin', full_name = 'Project Administrator'
where id = (select id from auth.users where email = 'YOUR_ADMIN_EMAIL');
```

The schema needs the profile row to exist. If your project does not automatically create it, insert it manually:

```sql
insert into public.profiles (id, full_name, role)
select id, 'Project Administrator', 'super_admin'
from auth.users
where email = 'YOUR_ADMIN_EMAIL'
on conflict (id) do update set role='super_admin';
```

5. Copy `.env.example` to `.env.local` and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

Add the same `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables in Vercel.

## Payment integration

The donation UI is ready for provider integration. Do not expose Paystack secret keys in client code. Add server-side initialization, verification and webhook routes before accepting live donations.

## Payments, receipts and media

The donation flow now supports real one-time NGN donations through Paystack.

### Required environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://your-domain.example
PAYSTACK_SECRET_KEY=
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` or `PAYSTACK_SECRET_KEY` to the browser.

### Supabase setup

Run `supabase/schema.sql` in the Supabase SQL Editor. It creates the payment fields, campaign-total trigger, and `media` / `documents` storage buckets with policies.

### Payment webhooks

Configure these URLs in the provider dashboards:

- `https://YOUR_DOMAIN/api/payments/paystack/webhook`

The webhook handlers validate the provider signature and then re-query the provider before marking a donation successful. This prevents a client-side callback from being treated as proof of payment.

### Donation receipts

After verification, donors receive a receipt page at `/api/receipts/{reference}`. It is print-friendly and supports **Print / Save as PDF** from the browser. A receipt token is returned by the verification endpoint and can be appended to the receipt URL for an additional access check.

### Campaign totals

`campaigns.amount_raised` is maintained by a PostgreSQL trigger based only on donations with `payment_status = 'successful'`. Inserts, successful/failed status changes, campaign reassignment, amount changes, and deletes recalculate the affected campaign totals.

### Media Library

Administrators can upload images and PDFs from `/admin/media`. Files are stored in Supabase Storage's public `media` bucket, while the `media` database table keeps the catalogue metadata. The private `documents` bucket is available for governance and other restricted files.

### Important

The current donation engine implements **one-time donations**. The UI does not claim that monthly donations are active. Recurring donations can be added later using provider subscription plans/webhooks after the NGO decides its recurring-donation policy.
# The-Giving-Back-Project
