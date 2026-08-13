# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Deployment & self-hosting

### Requirements

- **Node.js 20 or newer** (Node 22 recommended). npm 10+ or bun 1.1+.
- A Supabase project (database, auth, and — if you add file uploads — storage).

### Environment variables

Copy `.env.example` to `.env` and fill in every value. `VITE_*` variables are
bundled into the browser build; the rest are server-only and must be set as
secrets in your hosting provider, never committed.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | client | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | client | Supabase publishable/anon key |
| `VITE_SUPABASE_PROJECT_ID` | client | Supabase project ref |
| `SUPABASE_URL` | server | Same URL, for SSR and server functions |
| `SUPABASE_PUBLISHABLE_KEY` | server | Same publishable key, server side |
| `SUPABASE_PROJECT_ID` | server | Supabase project ref |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Bypasses RLS — used by the Paystack webhook and admin server functions |
| `PAYSTACK_SECRET_KEY` | server | Initialises and verifies payments, and validates webhook signatures. Omit it and checkout falls back to manual/WhatsApp mode |

### Build

```sh
npm install
npm run build      # production build
npm run dev        # local dev server on :8080
```

### Supabase setup after a fresh clone

1. Create a Supabase project and copy the URL, publishable key, project ref, and
   service role key into `.env`.
2. Apply the schema — this recreates every table, index, foreign key, function,
   and RLS policy the app depends on:

   ```sh
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```

   Migrations live in `supabase/migrations/` and are ordered by filename.
3. Enable **Email** sign-in under Authentication → Providers. Sign-up is used
   only for staff accounts; the first account to sign in can claim admin.
4. If you want Google sign-in, enable the Google provider in Supabase and
   replace the Lovable OAuth broker call in `src/routes/auth.tsx` with
   `supabase.auth.signInWithOAuth({ provider: "google" })`.
5. Add your Paystack webhook URL in the Paystack dashboard, pointing at
   `https://<your-domain>/api/public/webhooks/paystack`.

### Storage buckets

The app currently uses **no Supabase Storage buckets**. Product files, cover
images, and video modules are stored as plain URLs in the `products` table
(`file_url`, `cover_image`, `video_url`), so you can point them at any host. If
you later want uploads through the admin panel, create a private `products`
bucket and serve paid files through signed URLs — the paid delivery links must
never be publicly readable.

### Hosting notes

This is a TanStack Start app with a server runtime (SSR, server functions, and
the `/api/public/*` webhook route), so it must be deployed as a **server**
application, not a static site. On Vercel, use the TanStack Start / Nitro
preset rather than a static build, and set every server-only variable above as
a Vercel environment variable.

