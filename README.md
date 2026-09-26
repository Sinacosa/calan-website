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

## Automatic deployment

The workflow in `.github/workflows/deploy.yml` builds and deploys the production website whenever a
commit is pushed to `main`. It can also be started manually from the repository's Actions page.

Configure these repository settings under **Settings > Secrets and variables > Actions**:

| Type | Name | Value |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | A Cloudflare API token with Account > Cloudflare Pages > Edit permission |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID that owns the Pages project |
| Variable | `PUBLIC_TURNSTILE_SITE_KEY` | The public site key for the Calan Turnstile widget |

Create the API token from the Cloudflare dashboard's **API Tokens** page using a custom token with
**Account > Cloudflare Pages > Edit** permission. The account ID is shown in the domain overview and by
`npx wrangler whoami`.

The private `TURNSTILE_SECRET_KEY` remains stored in the Cloudflare Pages project. Do not add it to
GitHub. The workflow deploys to the existing `calan-website` project and uses the D1 binding from
`wrangler.jsonc`.
