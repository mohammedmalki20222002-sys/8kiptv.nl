import React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface LiveSportsProps {
  onPricingClick: () => void;
}

interface League {
  id: string;
  name: string;
  logo: string;
  country: string;
}

// Ordered for a Dutch audience: Eredivisie and the European club competitions first,
// then Formula 1 and cycling, then the foreign leagues Dutch households watch most.
const LEAGUES: League[] = [
  { id: "erediv",    name: "Eredivisie",                logo: "/sports/Eredivisie.png",             country: "Nederland"   },
  { id: "ucl",       name: "UEFA Champions League",     logo: "/sports/UEFA_Champions_League.png",  country: "Europa"      },
  { id: "uel",       name: "UEFA Europa League",        logo: "/sports/UEFA_Europa_League.png",     country: "Europa"      },
  { id: "uecl",      name: "UEFA Conference League",    logo: "/sports/UEFA_Conference_League.png", country: "Europa"      },
  { id: "f1",        name: "Formule 1",                 logo: "/sports/Formula_1.png",              country: "Motorsport"  },
  { id: "tdf",       name: "Tour de France",            logo: "/sports/Tour_de_France.png",         country: "Wielrennen"  },
  { id: "pl",        name: "Premier League",            logo: "/sports/Premier_League.png",         country: "Engeland"    },
  { id: "laliga",    name: "La Liga",                   logo: "/sports/La_Liga.png",                country: "Spanje"      },
  { id: "bl",        name: "Bundesliga",                logo: "/sports/Bundesliga.png",             country: "Duitsland"   },
  { id: "sa",        name: "Serie A",                   logo: "/sports/Serie_A.png",                country: "Italië"      },
  { id: "l1",        name: "Ligue 1",                   logo: "/sports/Ligue_1.png",                country: "Frankrijk"   },
  { id: "cpl",       name: "Challenger Pro League",     logo: "/sports/Challenger_Pro_League.png",  country: "België"      },
  { id: "primeirap", name: "Primeira Liga",             logo: "/sports/Primeira_Liga.png",          country: "Portugal"    },
  { id: "superlig",  name: "Süper Lig",                 logo: "/sports/Super_Lig.png",              country: "Turkije"     },
  { id: "spl",       name: "Saudi Pro League",          logo: "/sports/Saudi_Pro_League.png",       country: "Saoedi-Arabië"},
  { id: "bra",       name: "Brasileirão",               logo: "/sports/Brasileirao.png",            country: "Brazilië"    },
  { id: "ligapro",   name: "Liga Profesional",          logo: "/sports/Liga_Profesional.png",       country: "Argentinië"  },
  { id: "caf",       name: "CAF Champions League",      logo: "/sports/CAF_Champions_League.png",   country: "Afrika"      },
  { id: "ufc",       name: "UFC",                       logo: "/sports/UFC.png",                    country: "MMA"         },
  { id: "eurohl",    name: "EuroLeague",                logo: "/sports/UEFA_Champions_League.png",  country: "Basketbal"   },
  { id: "nhl",       name: "NHL",                      logo: "/sports/NHL.svg",                    country: "IJshockey"   },
  { id: "iihf",      name: "IIHF World Championship", logo: "/sports/IIHF.svg",                   country: "IJshockey"   },
  { id: "can",       name: "Canadian Championship",     logo: "/sports/Canadian_Championship.png",  country: "Canada"      },
];

// Only confirmed-working files used below.
// PNG logos → white box, natural colours. SVG logos → brand-colour box + invert filter.
type LogoKind = "svg-file" | "img";

interface Platform {
  id: string;
  name: string;
  sub: string;
  bg: string;
  logoKind: LogoKind;
  logo: string;
}

const INTL_PLATFORMS: Platform[] = [
  { id: "netflix",   name: "Netflix",      sub: "Films & series",    bg: "#141414", logoKind: "img", logo: "/logos/netflix.svg"          },
  { id: "disneyp",   name: "Disney+",      sub: "Disney Originals",  bg: "#000B8C", logoKind: "img", logo: "/logos/disneyplus.png"        },
  { id: "hbo",       name: "HBO Max",       sub: "HBO Originals",     bg: "#ffffff", logoKind: "img", logo: "/logos/hbomax-real.svg"       },
  { id: "prime",     name: "Prime Video",   sub: "Amazon Originals",  bg: "#ffffff", logoKind: "img", logo: "/logos/primevideo.svg"        },
  { id: "appletv",   name: "Apple TV+",     sub: "Apple Originals",   bg: "#f0f0f2", logoKind: "img", logo: "/logos/appletv-real.svg"      },
  { id: "paramount", name: "Paramount+",    sub: "CBS & Paramount",   bg: "#0064FF", logoKind: "img", logo: "/logos/paramount.svg"        },
  { id: "hulu",      name: "Hulu",          sub: "Live tv + VOD",     bg: "#0d0d0d", logoKind: "img", logo: "/logos/hulu.svg"             },
  { id: "dazn",      name: "DAZN",          sub: "Live sport",        bg: "#111111", logoKind: "img", logo: "/logos/dazn-real.svg"        },
  { id: "espn",      name: "ESPN+",         sub: "Sport live",        bg: "#CC0000", logoKind: "img", logo: "/logos/espn.svg"             },
  { id: "canal",     name: "Canal+",        sub: "Live sport & film", bg: "#001A50", logoKind: "img", logo: "/logos/canal.svg"            },
  { id: "crunch",    name: "Crunchyroll",   sub: "Anime & series",    bg: "#111111", logoKind: "img", logo: "/logos/crunchyroll-real.svg" },
  { id: "sky",       name: "Sky",           sub: "Sport & films",     bg: "#0072C6", logoKind: "img", logo: "/logos/sky.svg"              },
];

// Dutch platforms first — these are the ones a Netherlands visitor recognises.
const EU_PLATFORMS: Platform[] = [
  { id: "videoland", name: "Videoland",    sub: "NL series & films",     bg: "#E50000", logoKind: "img", logo: "/logos/videoland.svg"      },
  { id: "espnnl",    name: "ESPN NL",      sub: "Eredivisie live",       bg: "#CC0000", logoKind: "img", logo: "/logos/espn.svg"           },
  { id: "rtleu",     name: "RTL+",         sub: "Entertainment",         bg: "#CC0001", logoKind: "img", logo: "/logos/rtlplus.svg"       },
  { id: "beinsp",    name: "beIN Sports",  sub: "Premium sport",         bg: "#8B0000", logoKind: "img", logo: "/logos/bein.svg"           },
  { id: "skysp",     name: "Sky Sports",   sub: "Sport & entertainment", bg: "#0072C6", logoKind: "img", logo: "/logos/sky.svg"            },
  { id: "dazneu",    name: "DAZN",         sub: "Live sport",            bg: "#111111", logoKind: "img", logo: "/logos/dazn-real.svg"      },
  { id: "euroeu",    name: "Eurosport",    sub: "Sport & wielrennen",    bg: "#FF6600", logoKind: "img", logo: "/logos/eurosport.svg"     },
  { id: "discoeu",   name: "Discovery+",   sub: "Docu's & series",       bg: "#0070C0", logoKind: "img", logo: "/logos/discovery.svg"     },
  { id: "disneyeu",  name: "Disney+",      sub: "Disney & Marvel",       bg: "#000B8C", logoKind: "img", logo: "/logos/disneyplus.png"    },
  { id: "parameu",   name: "Paramount+",   sub: "Paramount & CBS",       bg: "#0064FF", logoKind: "img", logo: "/logos/paramount.svg"     },
  { id: "tnteu",     name: "TNT Sports",   sub: "Boksen & MMA live",     bg: "#1a1a1a", logoKind: "img", logo: "/logos/tnt.svg"           },
  { id: "cnneu",     name: "CNN Int'l",    sub: "Breaking news",         bg: "#ffffff", logoKind: "img", logo: "/logos/cnn-real.svg"      },
];

// ── League Card ────────────────────────────────────────────────────────────────
const LeagueCard: React.FC<{ l: League }> = ({ l }) => (
  <div className="shrink-0 flex items-center justify-center w-20 h-20 bg-white hover:bg-neutral-50 border border-black/8 rounded-2xl p-3 transition-colors shadow-sm" title={l.name}>
    <img
      src={l.logo}
      alt={l.name}
      className="w-full h-full object-contain drop-shadow-sm"
      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
    />
  </div>
);

// ── Platform Card ──────────────────────────────────────────────────────────────
const PlatformCard: React.FC<{ p: Platform }> = ({ p }) => {
  return (
    <div
      className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden p-2 shadow-sm"
      style={{ backgroundColor: p.bg }}
      title={p.name}
    >
      <img
        src={p.logo}
        alt={p.name}
        className="w-full h-full object-contain"
        onError={e => {
          const el = e.currentTarget;
          el.style.display = "none";
          const par = el.parentElement;
          if (par) {
            par.style.backgroundColor = p.bg;
            par.innerHTML = `<span style="color:white;font-size:8px;font-weight:900;text-align:center;line-height:1.2">${p.name}</span>`;
          }
        }}
      />
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────────
export default function LiveSports({ onPricingClick }: LiveSportsProps) {
  const { t } = useLanguage();
  const leaguesTripled = [...LEAGUES, ...LEAGUES, ...LEAGUES];
  const tripled1 = [...INTL_PLATFORMS, ...INTL_PLATFORMS, ...INTL_PLATFORMS];
  const tripled2 = [...EU_PLATFORMS,   ...EU_PLATFORMS,   ...EU_PLATFORMS];

  return (
    <>
      <section id="live-sports-section" className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4">
        <div className="rounded-2xl overflow-hidden relative text-white py-5"
          style={{ background: "linear-gradient(145deg, #0a0f1e 0%, #0d1a2e 55%, #091525 100%)" }}>
          <div className="overflow-hidden -mx-4 md:-mx-6 select-none pointer-events-none">
            <div className="animate-scroll flex gap-3 px-4">
              {leaguesTripled.map((l, i) => (
                <div key={`${l.id}-${i}`} className="pointer-events-auto">
                  <LeagueCard l={l} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4">
        <div className="bg-[#080c14] text-white rounded-2xl py-8 px-4 md:px-6 relative overflow-hidden ring-1 ring-white/[8]">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#003580]/[0.06] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-0 w-56 h-56 bg-[#003580]/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 mb-5 px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {t.platforms.heading}{" "}
              <span className="serif-display italic font-light text-white/85">{t.platforms.headingItalic}</span>
            </h2>
            <p className="serif-display italic font-light text-xl text-white/75 mt-1">
              {t.platforms.subheading}
            </p>
          </div>

          <div className="overflow-hidden -mx-4 md:-mx-6 mb-3 select-none pointer-events-none">
            <div className="animate-scroll flex gap-3 px-4">
              {tripled1.map((p, i) => <PlatformCard key={`r1-${p.id}-${i}`} p={p} />)}
            </div>
          </div>

          <div className="overflow-hidden -mx-4 md:-mx-6 mb-8 select-none pointer-events-none">
            <div className="animate-scroll-reverse flex gap-3 px-4">
              {tripled2.map((p, i) => <PlatformCard key={`r2-${p.id}-${i}`} p={p} />)}
            </div>
          </div>

          <div className="relative z-10 flex justify-end pt-6 border-t border-white/[8]">
            <button onClick={onPricingClick}
              className="flex items-center gap-2 bg-white text-[#003580] font-extrabold text-sm px-6 py-2.5 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.25)] active:translate-y-0.5 active:shadow-none hover:bg-white/90 transition-all shrink-0">
              <span>{t.platforms.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
