# Calan Website Agent Guide

These instructions apply to the entire `calan-website` directory.

## Required Context

Before making product, copy, layout, component, styling, or animation changes, read and follow
[`DESIGN.md`](./DESIGN.md). It records the approved brand and design direction. Preserve that direction
unless the user explicitly asks to change it.

Read [`README.md`](./README.md) before changing Cloudflare deployment, D1, Turnstile, or environment
configuration.

## Project Structure

- `src/pages/index.astro`: landing page structure, copy, and lightweight client behavior
- `src/styles/global.css`: visual tokens, layout, responsive behavior, and motion
- `src/layouts/SiteLayout.astro`: shared document metadata and page shell
- `functions/api/waitlist.ts`: Cloudflare Pages waitlist endpoint
- `migrations/`: D1 database migrations
- `public/`: static assets and Cloudflare headers

## Engineering Rules

- Keep the site static-first and compatible with Cloudflare Pages.
- Prefer semantic Astro and plain CSS. Do not add React or a UI framework without a concrete need.
- Reuse the existing design tokens and patterns before adding new ones.
- Keep client-side JavaScript minimal and progressively enhanced.
- Preserve accessibility, reduced-motion support, SEO metadata, and mobile behavior.
- Do not make unsupported privacy or product capability claims.
- Keep waitlist collection limited to email unless the requirements explicitly change.
- Update `DESIGN.md` when an approved decision materially changes the design system.
- Update `README.md` when setup or deployment steps change.

## Verification

Run the following before completing changes:

```sh
npm run build
```

For visual changes, also inspect the page at desktop and mobile widths and verify there is no horizontal
overflow. For Pages Function changes, compile or run the function through Wrangler in addition to the
Astro build.
