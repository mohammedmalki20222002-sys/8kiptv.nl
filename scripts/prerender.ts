/**
 * Post-build prerenderer.
 *
 * The site is a client-rendered Vite SPA. Search engines and social crawlers that
 * fetch a blog URL would otherwise receive the generic index.html shell (same title
 * for every route + a canonical pointing at the homepage), which makes the posts
 * un-indexable. This script emits a real static HTML file per route with its own
 * <title>, meta description, canonical, Open Graph / Twitter tags, Article JSON-LD
 * and the actual article text baked into the HTML, so every post is crawlable and
 * indexable as its own page. It also writes sitemap.xml from the real post list.
 * Runs after `vite build`.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_POSTS } from "../src/data/allPosts";
import { getPostText, getPostLang, type BlogPost } from "../src/data/blogPosts";
import { SITE_LANG, type LangCode } from "../src/i18n";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
const SITE = "https://8kiptv.nl";
const BRAND = "8K IPTV";

// Must match index.html exactly — these are the anchors the template is patched on.
const TPL_HTML_TAG = '<html lang="nl">';
const TPL_CANONICAL = '<link rel="canonical" href="https://8kiptv.nl/" />';
const TPL_TITLE = "<title>8K IPTV — Premium IPTV Abonnement Nederland</title>";

const HOME_DESCRIPTION =
  "8K IPTV: premium IPTV-abonnement voor Nederland. Meer dan 89.000 livekanalen en 200.000 films en series in VOD tot 8K, op Smart TV, Android, Fire TV en meer.";

const template = readFileSync(resolve(DIST, "index.html"), "utf8");

for (const [name, anchor] of Object.entries({ TPL_HTML_TAG, TPL_CANONICAL, TPL_TITLE })) {
  if (!template.includes(anchor)) {
    throw new Error(
      `prerender: ${name} not found in dist/index.html.\n  Expected: ${anchor}\n` +
        `  Update the constant in scripts/prerender.ts to match index.html.`
    );
  }
}

const OG_LOCALE: Record<string, string> = {
  nl: "nl_NL", en: "en_US", fr: "fr_FR", fi: "fi_FI", de: "de_DE", es: "es_ES",
  it: "it_IT", sv: "sv_SE", no: "nb_NO", da: "da_DK", pl: "pl_PL", pt: "pt_PT",
  ro: "ro_RO", cs: "cs_CZ", tr: "tr_TR", ar: "ar_AR",
};

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const stripMd = (s: string): string => s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

const truncate = (s: string, n: number): string =>
  s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)).trimEnd() + "…";

/** Convert a body paragraph with [label](url) markdown links into safe HTML with real anchors. */
function paragraphToHtml(text: string): string {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out += esc(text.slice(last, m.index));
    out += `<a href="${esc(m[2])}" rel="noopener">${esc(m[1])}</a>`;
    last = m.index + m[0].length;
  }
  if (last < text.length) out += esc(text.slice(last));
  return out;
}

interface PageOpts {
  lang: string;
  title: string;
  description: string;
  canonical: string;
  image?: string;
  ogType: "website" | "article";
  jsonLd: object[];
  bodyHtml: string;
}

function buildPage(o: PageOpts): string {
  const locale = OG_LOCALE[o.lang] ?? "nl_NL";
  const img = o.image ?? `${SITE}/favicon.png`;
  const head = [
    `<meta name="description" content="${esc(o.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:type" content="${o.ogType}" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:title" content="${esc(o.title)}" />`,
    `<meta property="og:description" content="${esc(o.description)}" />`,
    `<meta property="og:url" content="${esc(o.canonical)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(o.title)}" />`,
    `<meta name="twitter:description" content="${esc(o.description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
    ...o.jsonLd.map(
      (j) =>
        `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`
    ),
  ].join("\n    ");

  return template
    .replace(TPL_HTML_TAG, `<html lang="${o.lang}">`)
    .replace(TPL_CANONICAL, `<link rel="canonical" href="${esc(o.canonical)}" />`)
    .replace(TPL_TITLE, `<title>${esc(o.title)}</title>\n    ${head}`)
    .replace('<div id="root"></div>', `<div id="root">${o.bodyHtml}</div>`);
}

function postUrl(slug: string): string {
  return `${SITE}/blog/${slug}`;
}

// ---- per-post pages -------------------------------------------------------
let count = 0;
for (const post of ALL_POSTS) {
  const lang = getPostLang(post, SITE_LANG) as LangCode;
  const t = getPostText(post, lang);
  const canonical = postUrl(post.slug);
  const description = truncate(stripMd(t.excerpt), 160);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: stripMd(t.excerpt),
    image: [post.image],
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    inLanguage: lang,
    author: { "@type": "Organization", name: BRAND, url: SITE },
    publisher: {
      "@type": "Organization",
      name: BRAND,
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: post.category,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: BRAND, item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: t.title, item: canonical },
    ],
  };

  const bodyHtml = [
    `<article>`,
    `<nav><a href="/">${BRAND}</a> › <a href="/blog">Blog</a></nav>`,
    `<p>${esc(post.category)} · ${post.dateISO} · ${post.minutes} min</p>`,
    `<h1>${esc(t.title)}</h1>`,
    `<p>${esc(stripMd(t.excerpt))}</p>`,
    `<img src="${esc(post.image)}" alt="${esc(t.title)}" width="1200" height="675" />`,
    ...t.body.map((p) => `<p>${paragraphToHtml(p)}</p>`),
    `</article>`,
  ].join("\n");

  const html = buildPage({
    lang,
    title: `${t.title} — ${BRAND}`,
    description,
    canonical,
    image: post.image,
    ogType: "article",
    jsonLd: [articleJsonLd, breadcrumbJsonLd],
    bodyHtml,
  });

  // Directory-style output so the URL /blog/<slug> is served as a real static
  // file WITHOUT needing cleanUrls (which breaks the SPA fallback rewrite).
  const outPath = resolve(DIST, "blog", post.slug, "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf8");
  count++;
}

// ---- /blog grid page ------------------------------------------------------
const sorted = [...ALL_POSTS].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
const gridItems = sorted
  .map((post: BlogPost) => {
    const lang = getPostLang(post, SITE_LANG);
    const t = getPostText(post, lang);
    return [
      `<article>`,
      `<h2><a href="/blog/${post.slug}">${esc(t.title)}</a></h2>`,
      `<p>${esc(stripMd(t.excerpt))}</p>`,
      `<p>${esc(post.category)} · ${post.dateISO}</p>`,
      `</article>`,
    ].join("\n");
  })
  .join("\n");

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${BRAND} Blog`,
  url: `${SITE}/blog`,
  inLanguage: SITE_LANG,
  blogPost: sorted.slice(0, 50).map((post) => {
    const t = getPostText(post, getPostLang(post, SITE_LANG));
    return {
      "@type": "BlogPosting",
      headline: t.title,
      url: postUrl(post.slug),
      datePublished: post.dateISO,
    };
  }),
};

const blogHtml = buildPage({
  lang: SITE_LANG,
  title: `IPTV Blog — Gidsen, vergelijkingen & tips | ${BRAND}`,
  description:
    "IPTV-gidsen, app-vergelijkingen, installatietips en advies om een betrouwbaar IPTV-abonnement in Nederland te kiezen met 8K IPTV.",
  canonical: `${SITE}/blog`,
  ogType: "website",
  jsonLd: [blogJsonLd],
  bodyHtml: `<h1>${BRAND} Blog</h1>\n${gridItems}`,
});
mkdirSync(resolve(DIST, "blog"), { recursive: true });
writeFileSync(resolve(DIST, "blog", "index.html"), blogHtml, "utf8");

// ---- homepage: real meta description + Organization JSON-LD ---------------
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND,
  url: SITE,
  logo: `${SITE}/favicon.png`,
  areaServed: { "@type": "Country", name: "Netherlands" },
};
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND,
  url: SITE,
  inLanguage: SITE_LANG,
  description: HOME_DESCRIPTION,
};

let home = readFileSync(resolve(DIST, "index.html"), "utf8");
if (!home.includes('name="description"')) {
  const homeHead = [
    `<meta name="description" content="${esc(HOME_DESCRIPTION)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="nl_NL" />`,
    `<meta property="og:title" content="8K IPTV — Premium IPTV Abonnement Nederland" />`,
    `<meta property="og:description" content="${esc(HOME_DESCRIPTION)}" />`,
    `<meta property="og:url" content="${SITE}/" />`,
    `<meta property="og:image" content="${SITE}/favicon.png" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...[orgJsonLd, websiteJsonLd].map(
      (j) =>
        `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`
    ),
  ].join("\n    ");
  home = home.replace(TPL_TITLE, `${TPL_TITLE}\n    ${homeHead}`);
  writeFileSync(resolve(DIST, "index.html"), home, "utf8");
}

// ---- sitemap.xml ----------------------------------------------------------
// Generated from the real post list so it can never drift out of sync with the
// pages that were actually emitted above.
const today = new Date().toISOString().slice(0, 10);
const urlEntry = (loc: string, priority: string, changefreq: string, lastmod: string) =>
  `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
  `    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urlEntry(`${SITE}/`, "1.0", "weekly", today),
  urlEntry(`${SITE}/blog`, "0.8", "daily", today),
  ...sorted.map((p) => urlEntry(postUrl(p.slug), "0.7", "monthly", p.dateISO)),
  "</urlset>",
].join("\n");
writeFileSync(resolve(DIST, "sitemap.xml"), sitemap + "\n", "utf8");

console.log(
  `Prerendered ${count} post pages + /blog grid + homepage meta, and wrote sitemap.xml with ${sorted.length + 2} URLs.`
);
