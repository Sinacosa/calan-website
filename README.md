# Calan website

The marketing site for Calan, built with Astro and designed for Cloudflare Pages.

## Local development

```sh
npm install
npm run dev
```

Astro serves the static site during normal development. To test the Pages Function and D1 locally,
create the database binding first and use `npm run cf:dev`.

## Cloudflare setup

1. Create the D1 database:

   ```sh
   npx wrangler d1 create calan-waitlist
   ```

2. Add the returned binding to `wrangler.jsonc`:

   ```jsonc
   "d1_databases": [
     {
       "binding": "WAITLIST_DB",
       "database_name": "calan-waitlist",
       "database_id": "<database-id>"
     }
   ]
   ```

3. Apply the database migration:

   ```sh
   npx wrangler d1 migrations apply calan-waitlist --remote
   ```

4. Create a Cloudflare Turnstile widget and set `PUBLIC_TURNSTILE_SITE_KEY` in the Pages build
   environment. Store its secret as `TURNSTILE_SECRET_KEY` in the Pages project settings.

5. Set `SITE_URL` to the production origin during the Cloudflare build if it is not `https://calan.app`.

6. Build and deploy:

   ```sh
   npm run cf:deploy
   ```

The waitlist endpoint deliberately returns a service-unavailable response until `WAITLIST_DB` is bound.
Turnstile validation is enabled when `TURNSTILE_SECRET_KEY` is present.
