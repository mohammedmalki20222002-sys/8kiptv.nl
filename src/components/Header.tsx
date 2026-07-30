import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface HeaderProps {
  onPricingClick: () => void;
  onReviewsClick: () => void;
  onFaqClick: () => void;
  onMoviesClick: () => void;
  onSportsClick: () => void;
}

export default function Header({ onPricingClick, onReviewsClick, onFaqClick, onMoviesClick, onSportsClick }: HeaderProps) {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isBlogPage = window.location.pathname.startsWith("/blog");

  return (
    <header className="sticky top-4 z-50 px-4 md:px-8 max-w-7xl mx-auto w-full transition-all">
      <div
        id="navigation-bar"
        className="backdrop-blur-md rounded-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] px-4 py-2 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #0a0f1c 0%, #0e1a30 45%, #0a0f1c 100%)" }}
      >
        {/* Logo — pure text wordmark */}
        <div className="pl-2 select-none flex items-baseline">
          <span style={{
            fontFamily: "'Arial Black', Arial, sans-serif",
            fontWeight: 900,
            fontSize: 20,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}>8K</span>
          <span style={{
            fontFamily: "'Arial Black', Arial, sans-serif",
            fontWeight: 900,
            fontSize: 20,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginLeft: 4,
          }}>IPTV</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white/8 py-1 px-1.5 rounded-full">
          <button onClick={onSportsClick} className="px-4 py-1.5 text-[13px] font-bold text-white bg-white/15 hover:bg-white/25 transition-colors rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
            <span>{t.nav.liveSport}</span>
          </button>
          <button onClick={onMoviesClick} className="px-4 py-1.5 text-[13px] font-medium text-white/75 hover:text-white transition-colors rounded-full">{t.nav.movies}</button>
          <button onClick={onPricingClick} className="px-4 py-1.5 text-[13px] font-medium text-white/75 hover:text-white transition-colors rounded-full">{t.nav.pricing}</button>
          <button onClick={onReviewsClick} className="px-4 py-1.5 text-[13px] font-medium text-white/75 hover:text-white transition-colors rounded-full">{t.nav.reviews}</button>
          <button onClick={onFaqClick} className="px-4 py-1.5 text-[13px] font-medium text-white/75 hover:text-white transition-colors rounded-full">{t.nav.faq}</button>
          <a
            href="/blog"
            className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors ${isBlogPage ? "text-white bg-white/15" : "text-white/75 hover:text-white"}`}
          >
            {t.nav.blog}
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 pr-1">
          <button
            onClick={onPricingClick}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #1e4fd8 0%, #2563eb 100%)",
              color: "#fff",
              boxShadow: "0 2px 10px rgba(30,79,216,0.4)",
            }}
          >
            <span>{t.nav.subscribe}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-16 left-4 right-4 border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-200"
          style={{ background: "linear-gradient(160deg, #0d1220 0%, #111827 100%)" }}
        >
          <button onClick={() => { onSportsClick(); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-white/8 text-sm font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span>{t.nav.liveSport}</span>
          </button>
          <button onClick={() => { onMoviesClick(); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-white/8 text-sm font-semibold text-white/75">{t.nav.movies}</button>
          <button onClick={() => { onPricingClick(); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-white/8 text-sm font-semibold text-white/75">{t.nav.pricing}</button>
          <button onClick={() => { onReviewsClick(); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-white/8 text-sm font-semibold text-white/75">{t.nav.reviews}</button>
          <button onClick={() => { onFaqClick(); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-white/8 text-sm font-semibold text-white/75">{t.nav.faq}</button>
          <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 text-sm font-semibold text-white/75">{t.nav.blog}</a>

          <button
            onClick={() => { onPricingClick(); setMobileMenuOpen(false); }}
            className="w-full text-center py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #1e4fd8 0%, #2563eb 100%)", boxShadow: "0 4px 16px rgba(30,79,216,0.4)" }}
          >
            {t.nav.mobileSubscribe}
          </button>
        </div>
      )}
    </header>
  );
}
