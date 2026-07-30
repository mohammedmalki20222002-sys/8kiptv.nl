/**
 * One-off migration: translate every non-Dutch, non-English blog post into Dutch.
 *
 * 8kiptv.nl is a Dutch site, but the post set inherited German, Spanish, Finnish,
 * Swedish, Norwegian and French keyword landing pages from the previous brand.
 * This script rewrites them as Dutch posts:
 *
 *   - title / excerpt / body are translated to natural Dutch (not literal),
 *   - the `[8K IPTV](${SITE})` and `[Instagram @8K IPTV](${INSTA})` markdown links
 *     are preserved exactly, including their count (12 brand + 1 Instagram),
 *   - the slug prefix de-/es-/fi-/sv-/no-/fr- becomes nl-, with a numeric suffix
 *     only where that would collide with a post that already exists,
 *   - `lang` and the content key become "nl".
 *
 * Output goes to src/data/nlTranslatedNN.ts in chunks, leaving the original
 * source files untouched on disk so the migration can be re-run or reverted.
 *
 * Usage:
 *   set GEMINI_API_KEY=...           (or put it in .env.local)
 *   npx tsx scripts/translateToNl.ts            # everything
 *   npx tsx scripts/translateToNl.ts --limit 20 # first 20 posts, for a trial run
 *   npx tsx scripts/translateToNl.ts --dry-run  # plan only, no API calls
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleGenAI } from "@google/genai";
import { ALL_POSTS } from "../src/data/allPosts";
import { getPostLang, getPostText, type BlogPost, type BlogPostText } from "../src/data/blogPosts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA = resolve(ROOT, "src", "data");

const SITE = "https://8kiptv.nl";
const INSTA = "https://www.instagram.com/my8k.tv/";
const SOURCE_LANGS = ["de", "es", "fi", "sv", "no", "fr"];
const CHUNK_SIZE = 20;
const MODEL = "gemini-2.5-flash";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const limitIdx = args.indexOf("--limit");
const LIMIT = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity;

const LANG_NAME: Record<string, string> = {
  de: "German", es: "Spanish", fi: "Finnish", sv: "Swedish", no: "Norwegian", fr: "French",
};

// ---- load .env.local / .env so the key does not have to live in the shell ----
for (const f of [".env.local", ".env"]) {
  const p = resolve(ROOT, f);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

// ---- work out the slug mapping up front -----------------------------------
const taken = new Set<string>();
const queue: { post: BlogPost; lang: string; newSlug: string }[] = [];
for (const p of ALL_POSTS) {
  const l = getPostLang(p, "nl");
  if (!SOURCE_LANGS.includes(l)) taken.add(p.slug);
}
const collisions: string[] = [];
for (const p of ALL_POSTS) {
  const lang = getPostLang(p, "nl");
  if (!SOURCE_LANGS.includes(lang)) continue;
  const base = p.slug.startsWith(lang + "-") ? "nl-" + p.slug.slice(lang.length + 1) : "nl-" + p.slug;
  let slug = base;
  if (taken.has(slug)) {
    collisions.push(`${p.slug} -> ${base}`);
    let i = 2;
    while (taken.has(`${base}-${i}`)) i++;
    slug = `${base}-${i}`;
  }
  taken.add(slug);
  queue.push({ post: p, lang, newSlug: slug });
}

console.log(`posts to translate: ${queue.length}`);
console.log(`slug collisions resolved with a numeric suffix: ${collisions.length}`);
if (DRY_RUN) {
  collisions.forEach((c) => console.log("  " + c));
  console.log("dry run — no API calls made, no files written.");
  process.exit(0);
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error(
    "GEMINI_API_KEY is not set.\n" +
      "Put it in .env.local as GEMINI_API_KEY=\"...\" or export it, then re-run.\n" +
      "Use --dry-run to inspect the slug plan without a key."
  );
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey });

// ---- translation ----------------------------------------------------------
const BRAND_LINK = `[8K IPTV](${SITE})`;
const INSTA_LINK = `[Instagram @8K IPTV](${INSTA})`;

const countOf = (s: string, needle: string) => s.split(needle).length - 1;

function prompt(text: BlogPostText, lang: string): string {
  return [
    `Translate this ${LANG_NAME[lang] ?? lang} IPTV blog post into natural, fluent Dutch (Netherlands, not Flemish).`,
    ``,
    `Hard rules:`,
    `1. Reproduce every markdown link EXACTLY as written, character for character:`,
    `   ${BRAND_LINK}`,
    `   ${INSTA_LINK}`,
    `   Do not translate the link text, do not change the URL, do not add or remove links.`,
    `2. Keep the same number of body paragraphs, in the same order.`,
    `3. Localise for a Dutch audience: refer to Nederland, Dutch providers (KPN, Ziggo, Odido)`,
    `   and Dutch channels/competitions (NPO, RTL, Videoland, ESPN, Eredivisie) where the`,
    `   original referred to its own country's equivalents. Never mention the source country.`,
    `4. Write for search: keep the title punchy and keyword-led, keep the excerpt under 200 characters.`,
    `5. Return ONLY minified JSON: {"title":"...","excerpt":"...","body":["...","..."]}`,
    ``,
    JSON.stringify({ title: text.title, excerpt: text.excerpt, body: text.body }),
  ].join("\n");
}

async function translate(text: BlogPostText, lang: string): Promise<BlogPostText> {
  const wantBrand = countOf([text.title, text.excerpt, ...text.body].join("\n"), BRAND_LINK);
  const wantInsta = countOf([text.title, text.excerpt, ...text.body].join("\n"), INSTA_LINK);

  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await ai.models.generateContent({
      model: MODEL,
      contents: prompt(text, lang),
      config: { responseMimeType: "application/json", temperature: 0.4 },
    });
    const raw = (res.text ?? "").trim();
    let parsed: BlogPostText;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.warn(`    attempt ${attempt}: response was not valid JSON, retrying`);
      continue;
    }
    if (!parsed.title || !parsed.excerpt || !Array.isArray(parsed.body)) {
      console.warn(`    attempt ${attempt}: missing fields, retrying`);
      continue;
    }
    const joined = [parsed.title, parsed.excerpt, ...parsed.body].join("\n");
    const gotBrand = countOf(joined, BRAND_LINK);
    const gotInsta = countOf(joined, INSTA_LINK);
    if (gotBrand !== wantBrand || gotInsta !== wantInsta) {
      console.warn(
        `    attempt ${attempt}: link count drifted (brand ${gotBrand}/${wantBrand}, insta ${gotInsta}/${wantInsta}), retrying`
      );
      continue;
    }
    if (parsed.body.length !== text.body.length) {
      console.warn(`    attempt ${attempt}: ${parsed.body.length} paragraphs vs ${text.body.length}, retrying`);
      continue;
    }
    return parsed;
  }
  throw new Error("translation failed after 3 attempts");
}

// ---- emit -----------------------------------------------------------------
/** Turn a runtime string back into a source template literal using ${SITE} / ${INSTA}. */
function toTemplate(s: string): string {
  const escaped = s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  return escaped.split(SITE).join("${SITE}").split(INSTA).join("${INSTA}");
}

const jsonStr = (s: string) => JSON.stringify(s);

function renderPost(p: BlogPost, slug: string, t: BlogPostText): string {
  return [
    `  {`,
    `    slug: ${jsonStr(slug)},`,
    `    category: ${jsonStr(p.category)},`,
    `    dateISO: ${jsonStr(p.dateISO)},`,
    `    image: ${jsonStr(p.image)},`,
    `    minutes: ${p.minutes},`,
    `    lang: "nl",`,
    `    content: {`,
    `      nl: {`,
    `        title: \`${toTemplate(t.title)}\`,`,
    `        excerpt: \`${toTemplate(t.excerpt)}\`,`,
    `        body: [`,
    ...t.body.map((b) => `          \`${toTemplate(b)}\`,`),
    `        ],`,
    `      },`,
    `    },`,
    `  },`,
  ].join("\n");
}

function writeChunk(index: number, rendered: string[]): string {
  const n = String(index).padStart(2, "0");
  const constName = `NL_TRANSLATED_${n}`;
  const file = [
    `import { BlogPost } from "./blogPosts";`,
    ``,
    `const SITE = "${SITE}";`,
    `const INSTA = "${INSTA}";`,
    ``,
    `export const ${constName}: BlogPost[] = [`,
    ...rendered,
    `];`,
    ``,
  ].join("\n");
  writeFileSync(resolve(DATA, `nlTranslated${n}.ts`), file, "utf8");
  return constName;
}

async function main() {
  const work = queue.slice(0, LIMIT === Infinity ? queue.length : LIMIT);
  const rendered: string[] = [];
  const constNames: string[] = [];
  const failures: string[] = [];
  let chunkIndex = 1;

  for (let i = 0; i < work.length; i++) {
    const { post, lang, newSlug } = work[i];
    const src = getPostText(post, lang as never);
    process.stdout.write(`[${i + 1}/${work.length}] ${post.slug} -> ${newSlug} `);
    try {
      const out = await translate(src, lang);
      rendered.push(renderPost(post, newSlug, out));
      console.log("ok");
    } catch (e) {
      console.log("FAILED");
      failures.push(`${post.slug}: ${(e as Error).message}`);
    }
    if (rendered.length === CHUNK_SIZE) {
      constNames.push(writeChunk(chunkIndex++, rendered.splice(0, rendered.length)));
    }
  }
  if (rendered.length) constNames.push(writeChunk(chunkIndex, rendered));

  console.log(`\nwrote ${constNames.length} file(s): ${constNames.join(", ")}`);
  if (failures.length) {
    console.log(`\n${failures.length} post(s) failed:`);
    failures.forEach((f) => console.log("  " + f));
  }
  console.log(
    `\nNext: wire the new constants into src/data/allPosts.ts and drop the ` +
      `de/es/fi/sv/no source imports, then run: npm run build`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
