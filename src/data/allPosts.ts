import { BLOG_POSTS, BlogPost } from "./blogPosts";
import { SEO_BLOG_POSTS } from "./seoBlogPosts";
import { UK_BLOG_POSTS_01 } from "./ukBlogPosts01";
import { UK_BLOG_POSTS_02 } from "./ukBlogPosts02";
import { UK_BLOG_POSTS_03 } from "./ukBlogPosts03";
import { UK_BLOG_POSTS_04 } from "./ukBlogPosts04";
import { UK_BLOG_POSTS_05 } from "./ukBlogPosts05";
import { UK_BLOG_POSTS_06 } from "./ukBlogPosts06";
import { UK_BLOG_POSTS_07 } from "./ukBlogPosts07";
import { UK_BLOG_POSTS_08 } from "./ukBlogPosts08";
import { UK_BLOG_POSTS_09 } from "./ukBlogPosts09";
import { UK_BLOG_POSTS_10 } from "./ukBlogPosts10";
import { UK_BLOG_POSTS_11 } from "./ukBlogPosts11";
import { UK_BLOG_POSTS_12 } from "./ukBlogPosts12";
import { UK_BLOG_POSTS_13 } from "./ukBlogPosts13";
import { UK_BLOG_POSTS_14 } from "./ukBlogPosts14";
import { UK_BLOG_POSTS_15 } from "./ukBlogPosts15";
import { UK_BLOG_POSTS_16 } from "./ukBlogPosts16";
import { UK_BLOG_POSTS_17 } from "./ukBlogPosts17";
import { UK_BLOG_POSTS_18 } from "./ukBlogPosts18";
import { UK_BLOG_POSTS_19 } from "./ukBlogPosts19";
import { UK_BLOG_POSTS_20 } from "./ukBlogPosts20";
import { UK_BLOG_POSTS_21 } from "./ukBlogPosts21";
import { UK_BLOG_POSTS_22 } from "./ukBlogPosts22";
import { NL_BLOG_POSTS_01 } from "./nlBlogPosts01";
import { NL_BLOG_POSTS_02 } from "./nlBlogPosts02";
import { NL_BLOG_POSTS_03 } from "./nlBlogPosts03";
import { NL_BLOG_POSTS_04 } from "./nlBlogPosts04";
import { NL_BLOG_POSTS_05 } from "./nlBlogPosts05";
import { NL_BLOG_POSTS_06 } from "./nlBlogPosts06";
import { NL_BLOG_POSTS_07 } from "./nlBlogPosts07";
import { NL_BLOG_POSTS_08 } from "./nlBlogPosts08";
import { NL_BLOG_POSTS_09 } from "./nlBlogPosts09";
import { NL_BLOG_POSTS_10 } from "./nlBlogPosts10";
import { NL_BLOG_POSTS_11 } from "./nlBlogPosts11";
import { NL_BLOG_POSTS_12 } from "./nlBlogPosts12";
import { NL_BLOG_POSTS_13 } from "./nlBlogPosts13";
import { NL_BLOG_POSTS_14 } from "./nlBlogPosts14";
import { NL_BLOG_POSTS_15 } from "./nlBlogPosts15";
import { NL_BLOG_POSTS_16 } from "./nlBlogPosts16";
import { NL_BLOG_POSTS_17 } from "./nlBlogPosts17";
import { NL_BLOG_POSTS_18 } from "./nlBlogPosts18";
import { NL_BLOG_POSTS_19 } from "./nlBlogPosts19";
import { EN_BLOG_POSTS_01 } from "./enBlogPosts01";
import { EN_BLOG_POSTS_02 } from "./enBlogPosts02";

const FR_BLOG_POSTS: BlogPost[] = [
  ...UK_BLOG_POSTS_01,
  ...UK_BLOG_POSTS_02,
  ...UK_BLOG_POSTS_03,
  ...UK_BLOG_POSTS_04,
  ...UK_BLOG_POSTS_05,
  ...UK_BLOG_POSTS_06,
  ...UK_BLOG_POSTS_07,
  ...UK_BLOG_POSTS_08,
  ...UK_BLOG_POSTS_09,
  ...UK_BLOG_POSTS_10,
  ...UK_BLOG_POSTS_11,
  ...UK_BLOG_POSTS_12,
  ...UK_BLOG_POSTS_13,
  ...UK_BLOG_POSTS_14,
  ...UK_BLOG_POSTS_15,
  ...UK_BLOG_POSTS_16,
  ...UK_BLOG_POSTS_17,
  ...UK_BLOG_POSTS_18,
  ...UK_BLOG_POSTS_19,
  ...UK_BLOG_POSTS_20,
  ...UK_BLOG_POSTS_21,
  ...UK_BLOG_POSTS_22,
];

const NL_BLOG_POSTS: BlogPost[] = [
  ...NL_BLOG_POSTS_01,
  ...NL_BLOG_POSTS_02,
  ...NL_BLOG_POSTS_03,
  ...NL_BLOG_POSTS_04,
  ...NL_BLOG_POSTS_05,
  ...NL_BLOG_POSTS_06,
  ...NL_BLOG_POSTS_07,
  ...NL_BLOG_POSTS_08,
  ...NL_BLOG_POSTS_09,
  ...NL_BLOG_POSTS_10,
  ...NL_BLOG_POSTS_11,
  ...NL_BLOG_POSTS_12,
  ...NL_BLOG_POSTS_13,
  ...NL_BLOG_POSTS_14,
  ...NL_BLOG_POSTS_15,
  ...NL_BLOG_POSTS_16,
  ...NL_BLOG_POSTS_17,
  ...NL_BLOG_POSTS_18,
  ...NL_BLOG_POSTS_19,
];

const EN_BLOG_POSTS: BlogPost[] = [
  ...EN_BLOG_POSTS_01,
  ...EN_BLOG_POSTS_02,
];

export const ALL_POSTS: BlogPost[] = [...SEO_BLOG_POSTS, ...FR_BLOG_POSTS, ...NL_BLOG_POSTS, ...EN_BLOG_POSTS, ...BLOG_POSTS].sort((a, b) =>
  b.dateISO.localeCompare(a.dateISO)
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find(p => p.slug === slug);
}
