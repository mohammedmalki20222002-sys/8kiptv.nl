import { useEffect, useState } from "react";
import { PricingPlan } from "./types";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import Header from "./components/Header";
import LiveSports from "./components/LiveSports";
import MovieGrid from "./components/MovieGrid";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import DeviceCompatibility from "./components/DeviceCompatibility";
import ChannelStripe from "./components/ChannelStripe";
import PaymentsAndFaq from "./components/PaymentsAndFaq";
import Hero from "./components/Hero";
import VideoShowcase from "./components/VideoShowcase";
import EuropeCoverage from "./components/EuropeCoverage";
import CheckoutModal from "./components/CheckoutModal";
import BlogGrid from "./components/BlogGrid";
import BlogPost from "./components/BlogPost";

type View = { type: "home" } | { type: "blog-grid" } | { type: "blog-post"; slug: string };

function resolveView(): View {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/blog") return { type: "blog-grid" };
  const match = path.match(/^\/blog\/([^/]+)$/);
  if (match) return { type: "blog-post", slug: match[1] };
  return { type: "home" };
}

function AppInner({ view }: { view: View }) {
  const { t, dir } = useLanguage();
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);
  const isHome = view.type === "home";

  const scrollToSection = (id: string) => {
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "") || "";
    const canonicalUrl = `https://8kiptv.nl${path}${path ? "" : "/"}`;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }, [view]);

  return (
    <div
      dir={dir}
      className="min-h-screen bg-[#FDFDF7] text-neutral-900 flex flex-col font-sans selection:bg-[#003580] selection:text-white overflow-x-hidden w-full"
    >
      <Header
        onSportsClick={() => scrollToSection("live-sports-section")}
        onMoviesClick={() => scrollToSection("movies-section")}
        onPricingClick={() => scrollToSection("pricing-section")}
        onReviewsClick={() => scrollToSection("reviews-section")}
        onFaqClick={() => scrollToSection("faq-section")}
      />

      <main className="flex-grow">
        {view.type === "home" && (
          <>
            <div className="pt-6 md:pt-10" />
            <Hero onPricingClick={() => scrollToSection("pricing-section")} />
            <VideoShowcase />
            <EuropeCoverage onPricingClick={() => scrollToSection("pricing-section")} />
            <LiveSports onPricingClick={() => scrollToSection("pricing-section")} />
            <MovieGrid onPricingClick={() => scrollToSection("pricing-section")} />
            <Pricing onSelectPlan={setSelectedPlanForCheckout} />

            {/* Payment methods banner */}
            <div className="px-4 md:px-8 max-w-4xl mx-auto w-full py-4">
              <img
                src="/PAY1-1-1.svg"
                alt="Accepted payment methods"
                className="w-full h-auto"
              />
            </div>

            <ChannelStripe />
            <Testimonials />
            <DeviceCompatibility onPricingClick={() => scrollToSection("pricing-section")} />
            <PaymentsAndFaq />
          </>
        )}

        {view.type === "blog-grid" && (
          <>
            <div className="pt-6 md:pt-10" />
            <BlogGrid />
          </>
        )}

        {view.type === "blog-post" && (
          <>
            <div className="pt-6 md:pt-10" />
            <BlogPost slug={view.slug} onPricingClick={() => scrollToSection("pricing-section")} />
          </>
        )}
      </main>

      <footer className="mt-16 text-[#FDFDF7] py-16 px-6 md:px-12 border-t border-white/5" style={{ background: "linear-gradient(160deg, #0a0f1c 0%, #0e1829 50%, #0a0f1c 100%)" }}>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Logo & tagline */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="select-none flex items-baseline">
              <span style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900, fontSize: 26, color: "rgba(255,255,255,0.5)", letterSpacing: "-0.02em", lineHeight: 1 }}>8K</span>
              <span style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900, fontSize: 26, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1, marginLeft: 5 }}>IPTV</span>
            </div>
            <p className="serif-display italic font-light text-lg text-neutral-200 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <p className="serif-display italic font-light text-base text-neutral-500 pt-3">
              {t.footer.copyright}
            </p>
          </div>

          {/* Subscriptions links */}
          <div className="md:col-span-3 text-left">
            <h5 className="serif-display italic font-light text-2xl text-neutral-100 mb-4">{t.footer.sub1}</h5>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => scrollToSection("pricing-section")} className="text-neutral-300 hover:text-white transition-colors">{t.footer.link1}</button></li>
              <li><button onClick={() => scrollToSection("pricing-section")} className="text-neutral-300 hover:text-white transition-colors">{t.footer.link2}</button></li>
              <li><button onClick={() => scrollToSection("pricing-section")} className="text-white hover:underline font-semibold transition-colors">{t.footer.link3}</button></li>
            </ul>
          </div>

          {/* Content & Support links */}
          <div className="md:col-span-3 text-left">
            <h5 className="serif-display italic font-light text-2xl text-neutral-100 mb-4">{t.footer.sub2}</h5>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => scrollToSection("movies-section")} className="text-neutral-300 hover:text-white transition-colors">{t.footer.link4}</button></li>
              <li><button onClick={() => scrollToSection("channels-section")} className="text-neutral-300 hover:text-white transition-colors">{t.footer.link5}</button></li>
              <li><button onClick={() => scrollToSection("faq-section")} className="text-neutral-300 hover:text-white transition-colors">{t.footer.link6}</button></li>
              <li><a href="/blog" className="text-neutral-300 hover:text-white transition-colors">{t.nav.blog}</a></li>
            </ul>
          </div>

          {/* Server status */}
          <div className="md:col-span-2 text-left">
            <h5 className="serif-display italic font-light text-2xl text-neutral-100 mb-4">{t.footer.sub3}</h5>
            <div className="inline-flex items-center gap-1.5 bg-[#003580]/40 border border-[#003580] px-3.5 py-1.5 rounded-full text-[10px] font-mono text-[#FDFDF7] font-bold uppercase tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span>{t.footer.allRelays}</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto w-full mt-10 pt-8 border-t border-neutral-800/[65] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-neutral-500">
          <p>{t.footer.legal}</p>
          <div className="flex gap-4">
            <span className="hover:text-neutral-300 cursor-pointer">{t.footer.cert}</span>
            <span className="hover:text-neutral-300 cursor-pointer">{t.footer.sla}</span>
          </div>
        </div>
      </footer>

      {selectedPlanForCheckout && (
        <CheckoutModal
          plan={selectedPlanForCheckout}
          onClose={() => setSelectedPlanForCheckout(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  const view = resolveView();
  return (
    <LanguageProvider>
      <AppInner view={view} />
    </LanguageProvider>
  );
}
