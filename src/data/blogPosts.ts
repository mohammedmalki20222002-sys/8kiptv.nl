import { LangCode } from "../i18n";

export interface BlogPostText {
  title: string;
  excerpt: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  category: string;
  image: string;
  dateISO: string;
  minutes: number;
  /** Fixed display language for single-language SEO landing posts. When set, the post always
   *  renders in this language regardless of the site-wide language switcher. */
  lang?: LangCode;
  content: Partial<Record<LangCode, BlogPostText>>;
}

export function getPostLang(post: BlogPost, siteLang: LangCode): LangCode {
  return post.lang ?? siteLang;
}

export function getPostText(post: BlogPost, lang: LangCode): BlogPostText {
  const effectiveLang = getPostLang(post, lang);
  return post.content[effectiveLang] ?? post.content.en ?? Object.values(post.content)[0]!;
}

// This file originally held four Finland-market English/Finnish posts left over
// from the pre-rebrand MY.8KTV Finland template. None of them set an explicit
// `lang`, so getPostLang() defaulted them to SITE_LANG ("nl"): they were
// prerendered as <html lang="nl"> and submitted in sitemap-blog-nl.xml while
// their actual body text was English/Finnish and talked about "Finnish
// households" and Nordic services (Viaplay, C More) - a language/content
// mismatch unrelated to 8kiptv.nl's Dutch/Netherlands audience. Removed
// 2026-09-21 rather than relabeled, since the content itself doesn't apply to
// this market in any language.
export const BLOG_POSTS: BlogPost[] = [];
