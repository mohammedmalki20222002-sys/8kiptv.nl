import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Instagram } from "lucide-react";
import { getPostText, getPostLang } from "../data/blogPosts";
import { ALL_POSTS, getPostBySlug } from "../data/allPosts";
import { useLanguage } from "../LanguageContext";
import { getBlogText } from "../blogI18n";
import BlogPostCard, { formatPostDate } from "./BlogPostCard";
import RichText from "./RichText";

interface BlogPostProps {
  slug: string;
  onPricingClick: () => void;
}

export default function BlogPost({ slug, onPricingClick }: BlogPostProps) {
  const { lang } = useLanguage();
  const post = getPostBySlug(slug);
  const displayLang = post ? getPostLang(post, lang) : lang;
  const bt = getBlogText(displayLang);
  const text = post ? getPostText(post, lang) : null;

  useEffect(() => {
    document.title = text ? `${text.title} — 8K IPTV` : `${bt.notFoundTitle} — 8K IPTV`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", text ? text.excerpt : bt.notFoundDesc);
  }, [text, bt.notFoundTitle, bt.notFoundDesc]);

  if (!post || !text) {
    return (
      <section className="px-4 md:px-8 max-w-2xl mx-auto w-full py-24 text-center">
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-3">{bt.notFoundTitle}</h1>
        <p className="serif-display italic font-light text-lg text-neutral-500 mb-8">{bt.notFoundDesc}</p>
        <a href="/blog" className="inline-flex items-center gap-2 text-[#003580] font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" /> {bt.backToBlog}
        </a>
      </section>
    );
  }

  const sameLang = ALL_POSTS.filter(p => p.slug !== post.slug && getPostLang(p, lang) === displayLang);
  const otherLang = ALL_POSTS.filter(p => p.slug !== post.slug && getPostLang(p, lang) !== displayLang);
  const related = [...sameLang, ...otherLang].slice(0, 3);

  return (
    <article className="px-4 md:px-8 max-w-5xl mx-auto w-full py-10">
      <div className="max-w-3xl mx-auto">
        <a href="/blog" className="flex items-center gap-2 text-[#003580] font-bold text-sm hover:underline mb-6 w-fit">
          <ArrowLeft className="w-4 h-4" /> {bt.backToBlog}
        </a>

        <span className="block w-fit bg-[#003580] text-white text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full mb-4">
          {post.category}
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight mb-4">
          {text.title}
        </h1>

        <p className="text-sm font-mono text-neutral-400 mb-8">
          {formatPostDate(post.dateISO, displayLang)} · {post.minutes} {bt.minRead}
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden mb-10 bg-neutral-100 aspect-[16/9]">
        <img
          src={post.image}
          alt={text.title}
          className="w-full h-full object-cover"
          onError={e => { e.currentTarget.src = "/hero-bg.jpg"; }}
        />
      </div>

      <div className="max-w-3xl mx-auto space-y-6 mb-12">
        {text.body.map((paragraph, i) => (
          <p key={i} className="text-lg leading-relaxed text-neutral-700">
            <RichText text={paragraph} />
          </p>
        ))}
      </div>

      <div
        className="rounded-2xl px-6 py-10 text-center text-white mb-14"
        style={{ background: "linear-gradient(135deg, #1e4fd8 0%, #2563eb 100%)" }}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-5">{bt.ctaHeading}</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onPricingClick}
            className="inline-flex items-center gap-2 bg-white text-[#1e4fd8] font-black px-6 py-3 rounded-full hover:bg-white/90 transition-all"
          >
            {bt.ctaButton} <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="https://www.instagram.com/my8k.tv/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold px-6 py-3 rounded-full hover:bg-white/20 transition-all"
          >
            <Instagram className="w-4 h-4" /> @8K IPTV
          </a>
        </div>
        <p className="text-white/50 text-xs mt-4 font-mono">
          <a href="https://8kiptv.nl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            WWW.8KIPTV.NL
          </a>
        </p>
      </div>

      {related.length > 0 && (
        <div>
          <h3 className="text-2xl font-extrabold text-neutral-900 mb-5">{bt.related}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(p => (
              <div key={p.slug}>
                <BlogPostCard post={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
