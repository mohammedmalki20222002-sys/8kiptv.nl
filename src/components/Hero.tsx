import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const EU_CHANNELS = [
  { id: "bbc1",     name: "BBC One",       sub: "BBC One HD",        logo: "/logos/bbc.svg",       bg: "#BB1919" },
  { id: "itv",      name: "ITV",           sub: "ITV HD",            logo: "/logos/itv.svg",       bg: "#006540" },
  { id: "tf1",      name: "TF1",           sub: "TF1 HD",            logo: "/logos/tf1.svg",       bg: "#003F87" },
  { id: "skynews",  name: "Sky News",      sub: "Sky News HD",       logo: "/logos/skynews.svg",   bg: "#DA0000" },
  { id: "skysport", name: "Sky Sports",    sub: "Sky Sports HD",     logo: "/logos/sky.svg",       bg: "#0072C6" },
  { id: "dazn",     name: "DAZN",          sub: "DAZN EU",           logo: "/logos/dazn-real.svg", bg: "#111111" },
  { id: "beIN",     name: "beIN Sports",   sub: "beIN Sports 1",     logo: "/logos/bein.svg",      bg: "#8B0000" },
  { id: "viaplay",  name: "Viaplay",       sub: "Viaplay EU",        logo: "/logos/viaplay-real.svg", bg: "#111111" },
  { id: "canalp",   name: "Canal+",        sub: "Canal+ HD",         logo: "/logos/canal.svg",     bg: "#001A50" },
  { id: "euro1",    name: "Eurosport 1",   sub: "Eurosport 1 HD",    logo: "/logos/eurosport.svg", bg: "#FF6600" },
  { id: "espn",     name: "ESPN",          sub: "ESPN HD",           logo: "/logos/espn.svg",      bg: "#CC0000" },
  { id: "disco",    name: "Discovery+",    sub: "Discovery+ EU",     logo: "/logos/discovery.svg", bg: "#0070C0" },
  { id: "hbo",      name: "HBO Max",       sub: "HBO Max EU",        logo: "/logos/hbomax-real.svg",    bg: "#ffffff" },
  { id: "disney",   name: "Disney+",       sub: "Disney+ EU",        logo: "/logos/disneyplus.png",    bg: "#000B8C" },
  { id: "prime",    name: "Prime Video",   sub: "Amazon Prime",      logo: "/logos/primevideo.svg", bg: "#ffffff" },
  { id: "netflix",  name: "Netflix",       sub: "Netflix EU",        logo: "/logos/netflix.svg",   bg: "#141414" },
  { id: "natgeo",   name: "Nat Geo",       sub: "Nat Geo HD",        logo: "/logos/natgeo.svg",    bg: "#000000" },
  { id: "cnn",      name: "CNN Int'l",     sub: "CNN HD",            logo: "/logos/cnn-real.svg",  bg: "#ffffff" },
  { id: "paramount",name: "Paramount+",    sub: "Paramount+ EU",     logo: "/logos/paramount.svg", bg: "#0064FF" },
  { id: "france24", name: "France 24",     sub: "France 24 HD",      logo: "/logos/france24.png",  bg: "#F50000" },
];

interface HeroProps {
  onPricingClick: () => void;
}

export default function Hero({ onPricingClick }: HeroProps) {
  const { t } = useLanguage();
  const doubled = [...EU_CHANNELS, ...EU_CHANNELS, ...EU_CHANNELS];

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4">
      <div className="relative w-full rounded-2xl overflow-hidden min-h-[520px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[540px] flex flex-col">

        {/* Background: suo.jpg */}
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt="8K IPTV Premium"
            className="absolute right-0 top-0 h-full w-full sm:w-[62%] md:w-[58%] lg:w-[55%] object-cover object-center"
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

        {/* Decorative circles */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/[0.03] pointer-events-none" />
        <div className="absolute bottom-0 left-40 w-48 h-48 rounded-full bg-black/10 blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between h-full flex-1 gap-6 max-w-[600px]">

          {/* Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
              <Sparkles className="w-3 h-3 text-white/70" />
              <span className="text-[10px] font-bold text-white/70">TrustScore 4.9 ★★★★★</span>
            </div>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-3">
            <p className="serif-display italic font-light text-xl sm:text-2xl text-white/80">
              {t.hero.subtitle}
            </p>
            <h1 className="text-[2.4rem] sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.0] tracking-[-0.04em] font-black text-white">
              <span className="serif-display italic font-light text-white/80" style={{ fontSize: "1.06em" }}>
                {t.hero.headline1}
              </span>
              <br />
              <span className="text-[1.6rem] sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08] font-black text-white">
                {t.hero.headline2}
                <span
                  className="serif-display italic font-light block sm:inline text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl"
                  style={{ color: "#F5C842", textShadow: "0 0 40px rgba(245,200,66,0.35)" }}
                >
                  {t.hero.highlight}
                </span>{" "}
                <span className="serif-display italic text-white/90">{t.hero.end}</span>
              </span>
            </h1>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 sm:gap-8">
            {[
              { v: t.hero.stat1v, l: t.hero.stat1l },
              { v: t.hero.stat2v, l: t.hero.stat2l },
              { v: t.hero.stat3v, l: t.hero.stat3l },
            ].map(({ v, l }, i) => (
              <div key={l} className="flex items-center gap-6 sm:gap-8">
                {i > 0 && <div className="w-px h-6 bg-white/15" />}
                <div>
                  <p className="text-xl sm:text-2xl font-black leading-none text-white">{v}</p>
                  <p className="serif-display italic font-light text-xl text-white/75 mt-0.5">{l}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs + channel strip */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onPricingClick}
                className="flex items-center gap-2 bg-white text-[#003580] font-extrabold text-sm px-6 py-2.5 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.25)] active:translate-y-0.5 active:shadow-none hover:bg-white/90 transition-all"
              >
                <span>{t.hero.cta1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onPricingClick}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all"
              >
                {t.hero.cta2}
              </button>
            </div>

            {/* Limited offer scroll */}
            {(() => {
              const OFFERS = [
                { label: "12 MONTHS", bonus: "+ 3 MONTHS FREE", price: "99,99 €" },
                { label: "24 MONTHS", bonus: "+ 6 MONTHS FREE", price: "189,99 €" },
              ];
              const offersFilled = [...OFFERS, ...OFFERS, ...OFFERS, ...OFFERS, ...OFFERS, ...OFFERS];
              return (
                <div className="overflow-hidden -mx-6 sm:-mx-8 md:-mx-10 lg:-mx-12">
                  <div className="animate-scroll-reverse flex gap-2 px-2 py-0.5">
                    {offersFilled.map((o, i) => (
                      <div
                        key={i}
                        className="shrink-0 flex items-center gap-2 px-3.5 py-1 rounded-full"
                        style={{ background: "linear-gradient(135deg, #C8970A 0%, #F5C842 45%, #FFE370 100%)", boxShadow: "0 1px 6px rgba(200,151,10,0.4)" }}
                      >
                        <span className="text-[10px] font-black text-black/80 uppercase tracking-wider whitespace-nowrap">★ {o.label}</span>
                        <span className="w-px h-3 bg-black/20 shrink-0" />
                        <span className="text-[10px] font-black text-black whitespace-nowrap">{o.bonus}</span>
                        <span className="w-px h-3 bg-black/20 shrink-0" />
                        <span className="text-[10px] font-black text-black/70 whitespace-nowrap">{o.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Finnish channel auto-scroll strip */}
            <div className="overflow-hidden -mx-6 sm:-mx-8 md:-mx-10 lg:-mx-12">
              <div className="animate-scroll flex gap-2.5 px-2">
                {doubled.map((ch, i) => (
                  <div
                    key={`${ch.id}-${i}`}
                    className="shrink-0 flex items-center gap-3 bg-white hover:bg-white/95 border border-black/8 rounded-2xl px-3.5 py-2.5 transition-all duration-200 cursor-default shadow-sm"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden shrink-0 p-1"
                      style={{ backgroundColor: ch.bg }}
                    >
                      <img
                        src={ch.logo}
                        alt={ch.name}
                        className="w-full h-full object-contain"
                        onError={e => {
                          const el = e.currentTarget;
                          el.style.display = "none";
                          const parent = el.parentElement;
                          if (parent) {
                            parent.style.backgroundColor = ch.bg;
                            parent.innerHTML = `<span style="color:white;font-size:8px;font-weight:900;text-align:center;line-height:1.1;word-break:break-all">${ch.name}</span>`;
                          }
                        }}
                      />
                    </div>
                    <span className="text-[#111211] text-[13px] font-bold whitespace-nowrap">{ch.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social links — below both scroll bars */}
          <div className="flex items-center gap-3 px-6 sm:px-8 md:px-10 lg:px-12 pb-6">
            <a
              href="https://www.instagram.com/my8k.tv/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-4 py-2 transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #F9CE34, #EE2A7B, #6228D7)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5.5" fill="white" fillOpacity="0.2"/>
                <circle cx="12" cy="12" r="4.3" stroke="white" strokeWidth="2" fill="none"/>
                <circle cx="17.3" cy="6.7" r="1.2" fill="white"/>
              </svg>
              <span className="text-[12px] font-bold text-white tracking-wide">@8K IPTV</span>
            </a>

            <a
              href="https://www.tiktok.com/@my.8ktv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-4 py-2 transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#010101", border: "1px solid rgba(255,255,255,0.18)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.971-1.166-1.956-1.282-2.645h.004C16.362 1.333 16.4 1 16.4 1h-3.797v14.073c0 .189 0 .376-.008.561 0 .022-.002.042-.003.065v.017a3.22 3.22 0 01-1.615 2.516 3.164 3.164 0 01-1.574.42c-1.75 0-3.168-1.427-3.168-3.188 0-1.762 1.418-3.189 3.168-3.189.332 0 .65.052.95.147l.005-3.87a7.018 7.018 0 00-4.947 2.055A7.126 7.126 0 003.9 15.504c0 1.898.733 3.687 2.066 5.035A6.964 6.964 0 0011 22.564a6.964 6.964 0 005.034-2.025 7.12 7.12 0 002.066-5.035V8.418a9.196 9.196 0 005.4 1.739V6.37c-1.079 0-3.393-.71-4.179-4.808z" fill="white"/>
              </svg>
              <span className="text-[12px] font-bold text-white tracking-wide">@8K IPTV</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
