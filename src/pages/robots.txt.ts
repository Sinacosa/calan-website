import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const baseURL = site ?? new URL("https://calan.app");

  return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${new URL("sitemap-index.xml", baseURL)}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
