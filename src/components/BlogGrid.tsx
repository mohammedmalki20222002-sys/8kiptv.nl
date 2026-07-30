import { useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { BlogPost, getPostText, getPostLang } from "../data/blogPosts";
import { ALL_POSTS } from "../data/allPosts";
import { useLanguage } from "../LanguageContext";
import { getBlogText } from "../blogI18n";
import BlogPostCard, { formatPostDate } from "./BlogPostCard";

function FeaturedPost({ post }: { post: BlogPost }) {
  const { lang } = useLanguage();
  const displayLang = getPostLang(post, lang);
  const bt = getBlogText(displayLang);
  const text = getPostText(post, lang);

  return (
    <a
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-1 md:grid-cols-2 rounded-[2rem] overflow-hidden bg-[#0a0f1c] border border-white/10 hover:shadow-2xl transition-shadow duration-300 mb-8"
    >
      <div className="relative aspect-video md:aspect-auto overflow-hidden">
        <img
          src={post.image}
          alt={text.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.currentTarget.src = "/hero-bg.jpg"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0f1c] via-transparent to-transparent opacity-70 md:opacity-40" />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-white text-[#003580] text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full">
            {bt.featured}
          </span>
          <span className="text-white/40 text-[10px] font-black uppercase tracking-wide">{post.category}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-3 group-hover:text-white/90 transition-colors">
          {text.title}
        </h2>
        <p className="serif-display italic font-light text-base text-white/55 leading-relaxed mb-6 line-clamp-3">
          {text.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-white/35">
            {formatPostDate(post.dateISO, displayLang)} · {post.minutes} {bt.minRead}
          </span>
          <span className="flex items-center gap-1.5 text-white font-bold text-sm group-hover:gap-2.5 transition-all">
            {bt.readMore} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function BlogGrid() {
  const { lang } = useLanguage();
  const bt = getBlogText(lang);
  const [featured, ...rest] = ALL_POSTS;

  useEffect(() => {
    document.title = `${bt.pageTag} — 8K IPTV`;
  }, [bt.pageTag]);

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4">

      {/* Hero banner — same treatment as the homepage Hero */}
      <div className="relative w-full rounded-2xl overflow-hidden min-h-[400px] sm:min-h-[380px] md:min-h-[420px] flex flex-col mb-10">
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt="8K IPTV 8K"
            className="absolute right-0 top-0 h-full w-full sm:w-[60%] md:w-[55%] object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(8,12,20,0.98) 0%, rgba(8,12,20,0.94) 28%, rgba(8,12,20,0.70) 44%, rgba(8,12,20,0.25) 62%, rgba(8,12,20,0.05) 78%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0 sm:hidden"
            style={{ background: "linear-gradient(to top, rgba(8,12,20,0.96) 35%, rgba(8,12,20,0.30) 65%, transparent 100%)" }}
          />
        </div>

        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/[0.03] pointer-events-none" />
        <div className="absolute bottom-0 left-40 w-48 h-48 rounded-full bg-black/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 md:p-12 flex flex-col justify-center h-full flex-1 gap-4 max-w-[560px]">
          <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 w-fit">
            <Sparkles className="w-3 h-3 text-white/70" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-white/70">{bt.pageTag}</span>
          </div>
          <h1 className="text-[2.1rem] sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
            {bt.heading}{" "}
            <span className="serif-display italic font-light text-white/85">{bt.headingItalic}</span>
          </h1>
          <p className="serif-display italic font-light text-base sm:text-lg text-white/55 max-w-md leading-relaxed">
            {bt.subheading}
          </p>
        </div>
      </div>

      <FeaturedPost post={featured} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map(post => (
          <div key={post.slug}>
            <BlogPostCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
