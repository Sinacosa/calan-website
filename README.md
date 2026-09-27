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

## Search visibility

The site generates canonical URLs, Open Graph and Twitter metadata, Schema.org structured data,
`robots.txt`, and an XML sitemap. The API and custom 404 response are excluded from indexing.

Complete these production steps after deploying:

1. Attach both `calan.app` and `www.calan.app` to the Cloudflare Pages project, then configure Cloudflare
   to redirect HTTP and `www` requests to `https://calan.app` in one hop. Confirm the `www` hostname
   reaches Cloudflare Pages before adding the redirect; a hostname returning an origin error cannot run
   the redirect rule.
2. Add `calan.app` as a Domain property in Google Search Console and verify it with the provided DNS
   record. Submit `https://calan.app/sitemap-index.xml` from the Sitemaps screen.
3. Import the verified property into Bing Webmaster Tools and submit the same sitemap.
4. Inspect the homepage in Google Search Console and validate its structured data with Schema.org's
   validator after every material metadata change.
5. Check the production social preview with LinkedIn Post Inspector and Facebook Sharing Debugger when
   the social image changes.
6. Monitor indexing, Core Web Vitals, and crawl errors in Search Console after releases. Do not request
   indexing for preview deployments or unpublished pages.

Before launch, confirm that these production URLs return successfully and contain the canonical origin:

- `https://calan.app/`
- `https://calan.app/robots.txt`
- `https://calan.app/sitemap-index.xml`
- `https://calan.app/og-image.png`

## Localization

English is served from `/`. Localized versions are available under `/fr/`, `/es/`, `/de/`, `/zh/`,
`/ja/`, `/ar/`, and `/it/`, with matching `/privacy/` and `/terms/` pages beneath each prefix. Arabic
uses a right-to-left document direction. Visitors choose their language explicitly; the site does not
redirect based on browser settings.

Locale configuration lives in `src/i18n/config.ts`. All user-facing copy lives in typed files under
`src/i18n/locales/`; adding a required field to `SiteCopy` makes incomplete locale files fail type checking.
The shared landing and legal templates live in `src/components/`.

Every localized page emits its own title, description, canonical URL, Open Graph locale, structured data,
and reciprocal `hreflang` links. The sitemap integration publishes the same language relationships.

The initial translations are editorial drafts. Have a native speaker review marketing copy and obtain
professional legal review of every translated privacy policy and terms page before public launch.
