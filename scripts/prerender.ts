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
// Canonical origin. This MUST be the host that actually serves 200s: Vercel
// 308-redirects the apex 8kiptv.nl to www, so emitting apex URLs here would make
// every canonical, og:url and sitemap <loc> a redirect, which Search Console
// reports as "Page with redirect" rather than indexing the page.
const SITE = "https://www.8kiptv.nl";
const BRAND = "8K IPTV";

// Must match index.html exactly — these are the anchors the template is patched on.
const TPL_HTML_TAG = '<html lang="nl">';
const TPL_CANONICAL = `<link rel="canonical" href="${SITE}/" />`;
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

// A duplicate slug would silently overwrite one post's page with another's and put
// the same <loc> in the sitemap twice, which Search Console flags as a duplicate.
const seenSlugs = new Set<string>();
for (const post of ALL_POSTS) {
  if (seenSlugs.has(post.slug)) {
    throw new Error(`prerender: duplicate slug "${post.slug}" in ALL_POSTS.`);
  }
  seenSlugs.add(post.slug);
}

// ---- internal link graph --------------------------------------------------
// Without this every post is a dead end: the only links out are "/" and "/blog",
// so ~990 URLs all hang off one hub page with ~990 outbound links each worth
// almost nothing. Google discovers them and then never schedules a crawl.
// Related + prev/next links give each post real inbound links from pages in its
// own language and topic, which is what turns "Discovered" into "Crawled".
const byLang = new Map<string, BlogPost[]>();
for (const post of ALL_POSTS) {
  const lang = getPostLang(post, SITE_LANG);
  const bucket = byLang.get(lang);
  if (bucket) bucket.push(post);
  else byLang.set(lang, [post]);
}
for (const bucket of byLang.values()) {
  bucket.sort((a, b) => b.dateISO.localeCompare(a.dateISO));
}

const RELATED_COUNT = 6;

const RELATED_HEADING: Record<string, string> = {
  nl: "Meer lezen", de: "Mehr lesen", en: "Read more", fr: "À lire aussi",
  es: "Sigue leyendo", fi: "Lue lisää", sv: "Läs mer", no: "Les mer",
  da: "Læs mere", it: "Continua a leggere", pl: "Czytaj dalej",
  pt: "Leia mais", ro: "Continuă lectura", cs: "Další články",
  tr: "Devamını okuyun", ar: "اقرأ المزيد",
};

/** Same language first, same category before the rest, newest first, never itself. */
function relatedPosts(post: BlogPost, lang: string): BlogPost[] {
  const pool = byLang.get(lang) ?? [];
  const others = pool.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, RELATED_COUNT);
}

function postLinkHtml(p: BlogPost): string {
  const t = getPostText(p, getPostLang(p, SITE_LANG));
  return `<li><a href="/blog/${p.slug}">${esc(t.title)}</a></li>`;
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
    ...(() => {
      const siblings = byLang.get(lang) ?? [];
      const i = siblings.findIndex((p) => p.slug === post.slug);
      const newer = i > 0 ? siblings[i - 1] : undefined;
      const older = i >= 0 && i < siblings.length - 1 ? siblings[i + 1] : undefined;
      const related = relatedPosts(post, lang);
      const out: string[] = [];
      if (related.length) {
        out.push(`<aside><h2>${esc(RELATED_HEADING[lang] ?? RELATED_HEADING.en)}</h2>`);
        out.push(`<ul>${related.map(postLinkHtml).join("")}</ul></aside>`);
      }
      if (newer || older) {
        out.push(
          `<nav>${[
            older ? `<a rel="prev" href="/blog/${older.slug}">${esc(getPostText(older, lang).title)}</a>` : "",
            newer ? `<a rel="next" href="/blog/${newer.slug}">${esc(getPostText(newer, lang).title)}</a>` : "",
          ]
            .filter(Boolean)
            .join(" · ")}</nav>`
        );
      }
      return out;
    })(),
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

// ---- /voorwaarden ---------------------------------------------------------
// Static route rendered by React at runtime, so it needs the same treatment as
// the blog: a crawler that fetches the URL must get its own title/description
// instead of the generic shell.
const TERMS_TITLE = `Voorwaarden & klantbescherming | ${BRAND}`;
const TERMS_DESCRIPTION =
  "15 dagen terugbetalingsgarantie, 24/7 support, wekelijks onderhoud en kwartaalupdates van films. Lees de volledige voorwaarden en klantbescherming van 8K IPTV.";

const termsHtml = buildPage({
  lang: SITE_LANG,
  title: TERMS_TITLE,
  description: TERMS_DESCRIPTION,
  canonical: `${SITE}/voorwaarden`,
  ogType: "website",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: TERMS_TITLE,
      url: `${SITE}/voorwaarden`,
      inLanguage: SITE_LANG,
      description: TERMS_DESCRIPTION,
      isPartOf: { "@type": "WebSite", name: BRAND, url: SITE },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: BRAND, item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Voorwaarden", item: `${SITE}/voorwaarden` },
      ],
    },
  ],
  bodyHtml: [
    `<nav><a href="/">${BRAND}</a> › <a href="/voorwaarden">Voorwaarden</a></nav>`,
    `<h1>Voorwaarden &amp; klantbescherming</h1>`,
    `<p>${esc(TERMS_DESCRIPTION)}</p>`,
    `<p><a href="/">Bekijk de pakketten van ${BRAND}</a> · <a href="/blog">Lees de blog</a></p>`,
  ].join("\n"),
});
mkdirSync(resolve(DIST, "voorwaarden"), { recursive: true });
writeFileSync(resolve(DIST, "voorwaarden", "index.html"), termsHtml, "utf8");

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
//
// Deliberately only <loc> + <lastmod>:
//   * Google ignores <changefreq> and <priority> outright, so they were pure
//     payload — ~2 extra lines on every one of ~950 URLs.
//   * <lastmod> is derived from real post dates instead of `new Date()`. A
//     lastmod that jumps to "today" on every deploy, for every URL, is exactly
//     the pattern Google treats as unreliable and then stops trusting — which
//     costs recrawl priority on the posts that genuinely did change.
const today = new Date().toISOString().slice(0, 10);
const newestPostDate = sorted[0]?.dateISO ?? today;

const urlEntry = (loc: string, lastmod: string) =>
  `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;

// Cosmetic: browsers render a bare sitemap with "This XML file does not appear
// to have any style information associated with it", which looks like an error.
// Crawlers ignore the stylesheet.
const XSL = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';

const urlset = (entries: string[]): string =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    XSL,
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
  ].join("\n") + "\n";

// One sitemap per language instead of a single 990-URL file. Search Console
// reports coverage per sitemap, so a split makes it visible which language
// group Google actually indexes — and the Dutch pages, the ones this .nl domain
// is actually about, no longer queue behind 700 foreign-language URLs.
const sitemapFiles: string[] = [];

const corePages = urlset([
  urlEntry(`${SITE}/`, newestPostDate),
  urlEntry(`${SITE}/blog`, newestPostDate),
  urlEntry(`${SITE}/voorwaarden`, today),
]);
writeFileSync(resolve(DIST, "sitemap-pages.xml"), corePages, "utf8");
sitemapFiles.push("sitemap-pages.xml");

// Dutch first: it is the language of the domain and should be crawled first.
const langOrder = [
  SITE_LANG,
  ...[...byLang.keys()].filter((l) => l !== SITE_LANG).sort(),
];
for (const lang of langOrder) {
  const posts = byLang.get(lang);
  if (!posts?.length) continue;
  const file = `sitemap-blog-${lang}.xml`;
  writeFileSync(
    resolve(DIST, file),
    urlset(posts.map((p) => urlEntry(postUrl(p.slug), p.dateISO))),
    "utf8"
  );
  sitemapFiles.push(file);
}

const sitemapIndex = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  XSL,
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapFiles.map(
    (f) => `  <sitemap>\n    <loc>${SITE}/${f}</loc>\n    <lastmod>${newestPostDate}</lastmod>\n  </sitemap>`
  ),
  "</sitemapindex>",
].join("\n");
writeFileSync(resolve(DIST, "sitemap.xml"), sitemapIndex + "\n", "utf8");

console.log(
  `Prerendered ${count} post pages + /blog grid + /voorwaarden + homepage meta, ` +
    `and wrote a sitemap index over ${sitemapFiles.length} sitemaps (${sorted.length + 3} URLs).`
);
