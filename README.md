# 8K IPTV — 8kiptv.nl

Dutch-language sales site for **8K IPTV** premium IPTV subscriptions, targeting the
Netherlands. Vite + React 19 + Tailwind 4 SPA with a prerendered blog.

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

The dev server listens on <http://localhost:3000>.

## Build

```bash
npm run build
```

This runs `vite build` and then `scripts/prerender.ts`, which writes a real static
HTML file per blog route into `dist/` (own `<title>`, meta description, canonical,
Open Graph tags, Article JSON-LD and the article text baked in) so every post is
crawlable. It also regenerates `dist/sitemap.xml`.

## Before going live

- Add the Google Search Console and Bing verification tags in `index.html`
  (marked with `TODO(8kiptv.nl)`).
- Add the new GA4 / Google Ads tags for 8kiptv.nl in `index.html`. The previous
  property (`G-EGGEMMCEPF` / `AW-18242640156`) belonged to the old site and was
  deliberately removed.
- Confirm the Instagram / TikTok / WhatsApp links in `src/components/Hero.tsx`,
  `src/components/BlogPost.tsx` and `src/data/*.ts` point at the accounts you want
  to use for this brand.
