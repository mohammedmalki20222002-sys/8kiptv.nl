import { Star, ShieldCheck, BadgeCheck } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const EU_REVIEWS = [
  {
    id: "r1",
    name: "Thomas M.",
    role: "Voetbalfan",
    location: "Amsterdam",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    highlight: "Eredivisie, Champions League, F1 — glashelder en zonder haperen!",
    text: "Ik kijk elke Eredivisie-speelronde en alle Champions League-avonden in vlekkeloze kwaliteit. Geen buffering, geen bevriezing. 8K IPTV levert elke stream in topkwaliteit zonder geoblocking of VPN. Ik ga nooit meer terug naar mijn oude tv-pakket.",
    ratingValue: 5,
    date: "mei 2025",
    verified: true,
  },
  {
    id: "r2",
    name: "Sophie L.",
    role: "Serieliefhebber",
    location: "Utrecht",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    highlight: "Enorme VOD-bibliotheek — ik vind altijd iets nieuws!",
    text: "De film- en seriecatalogus is ongelooflijk. Ik vond de nieuwste releases, Nederlandse films en klassiekers allemaal in echte UHD-kwaliteit. Netflix, HBO, Videoland — alles zit in één abonnement.",
    ratingValue: 5,
    date: "april 2025",
    verified: true,
  },
  {
    id: "r3",
    name: "Marco B.",
    role: "Gezinsgebruiker",
    location: "Rotterdam",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&q=80",
    highlight: "Het hele gezin blij — installatie duurde maar 2 minuten!",
    text: "Mijn kinderen kijken tekenfilms op de Nederlandse jeugdzenders en zelf kijk ik graag Engelse series. We gebruiken twee apparaten tegelijk zonder problemen. De support reageerde binnen 5 minuten via WhatsApp. Uitstekende service.",
    ratingValue: 5,
    date: "maart 2025",
    verified: true,
  },
  {
    id: "r4",
    name: "Jeroen W.",
    role: "IT-engineer",
    location: "Eindhoven",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
    highlight: "Technisch superieur — ik heb bitrate en latency zelf gemeten",
    text: "Als softwareontwikkelaar heb ik de bitrate en serverlatency gemeten. Extreem lage ping, uitstekende compressie en een vrijwel verliesvrij beeld. Werkt vlekkeloos op Fire TV, Smart TV en tablet tegelijk.",
    ratingValue: 5,
    date: "februari 2025",
    verified: true,
  },
  {
    id: "r5",
    name: "Anouk G.",
    role: "Sportfan",
    location: "Groningen",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80",
    highlight: "Eredivisie, Premier League, F1 en MMA — allemaal op één plek!",
    text: "Als sportliefhebber wil ik alles kunnen zien: Champions League, Premier League, Formule 1 en UFC. 8K IPTV levert alle streams in eersteklas kwaliteit zonder geoblocking of VPN. Onverslaanbaar.",
    ratingValue: 5,
    date: "januari 2025",
    verified: true,
  },
  {
    id: "r6",
    name: "Kevin D.",
    role: "Student",
    location: "Tilburg",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=120&q=80",
    highlight: "Beste prijs-kwaliteit — ik bespaar ruim €60 per maand",
    text: "Ik betaalde apart voor Netflix, Disney+, Videoland en Ziggo Sport — samen ruim €60 per maand. Nu heb ik alles met één 8K IPTV-abonnement voor een fractie van die prijs. Beste beslissing ooit.",
    ratingValue: 5,
    date: "december 2024",
    verified: true,
  },
  {
    id: "r7",
    name: "Marieke K.",
    role: "Verpleegkundige",
    location: "Den Haag",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=120&q=80",
    highlight: "Werkt ook in het buitenland — NPO gekeken vanuit Spanje!",
    text: "Ik was op vakantie in Spanje en wilde het Nederlandse journaal kijken. App geopend en de stream liep meteen — geen IP-beperkingen, geen VPN nodig. Een fantastische dienst die met je meereist door heel Europa.",
    ratingValue: 5,
    date: "november 2024",
    verified: true,
  },
  {
    id: "r8",
    name: "David P.",
    role: "Ondernemer",
    location: "Almere",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=120&q=80",
    highlight: "Het 12-maandenplan was duidelijk de slimste keuze",
    text: "Ik begon met het proefabonnement van 3 maanden en was zo onder de indruk dat ik meteen ben overgestapt naar 12 maanden. De prijs is eerlijk, de dienst betrouwbaar en de bonusmaanden maken het nog aantrekkelijker. Echt een aanrader.",
    ratingValue: 5,
    date: "oktober 2024",
    verified: true,
  },
  {
    id: "r9",
    name: "Isabelle R.",
    role: "Lerares",
    location: "Maastricht",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
    highlight: "Het kinderslot is precies wat ik nodig had!",
    text: "Mijn kinderen kunnen veilig hun eigen programma's kijken en ik weet zeker dat ze niet bij ongepaste content komen. Het aanbod aan kinderzenders is enorm. De activering was direct en de support is altijd vriendelijk. Zeer tevreden.",
    ratingValue: 4,
    date: "september 2024",
    verified: false,
  },
];

export default function Testimonials() {
  const { t } = useLanguage();
  const avgRating = (EU_REVIEWS.reduce((s, r) => s + r.ratingValue, 0) / EU_REVIEWS.length).toFixed(1);

  return (
    <section id="reviews-section" className="px-4 md:px-8 max-w-7xl mx-auto w-full py-10">
      <div className="bg-[#111211] text-[#FDFDF7] rounded-[2.5rem] py-16 px-6 md:px-12 relative overflow-hidden">

        {/* Background accents */}
        <div className="absolute top-12 left-10 opacity-60 hidden lg:block pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C20 11.0457 11.0457 20 0 20C11.0457 20 20 28.9543 20 40C20 28.9543 28.9543 20 40 20C28.9543 20 20 11.0457 20 0Z" fill="#003580" />
          </svg>
        </div>
        <div className="absolute bottom-16 right-16 opacity-30 hidden lg:block pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C20 11.0457 11.0457 20 0 20C11.0457 20 20 28.9543 20 40C20 28.9543 28.9543 20 40 20C28.9543 20 20 11.0457 20 0Z" fill="#003580" />
          </svg>
        </div>

        {/* Headline */}
        <div className="max-w-xl mx-auto mb-10 text-center">
          <span className="serif-display italic font-light text-2xl text-white/85 mb-3 block">
            {t.testimonials.subtitle}
          </span>
          <h2 className="text-[1.85rem] sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-3">
            {t.testimonials.heading}
            <br />
            <span className="serif-display italic font-light text-white/90 pr-1.5">{t.testimonials.italic}</span>
          </h2>
          <p className="serif-display italic font-light text-base md:text-xl text-neutral-100 mt-4">
            {t.testimonials.desc}
          </p>
        </div>

        {/* Aggregate rating bar */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-black text-white leading-none">{avgRating}</span>
            <div className="flex items-center gap-0.5 mt-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#003580] text-[#003580]" />
              ))}
            </div>
            <span className="text-xs text-white/40 mt-1 font-mono">{EU_REVIEWS.length} reviews</span>
          </div>
          <div className="h-14 w-px bg-white/10" />
          <div className="flex flex-col gap-1.5">
            {[5, 4, 3].map(star => {
              const count = EU_REVIEWS.filter(r => r.ratingValue === star).length;
              const pct = Math.round((count / EU_REVIEWS.length) * 100);
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-white/40 w-4">{star}</span>
                  <Star className="w-3 h-3 fill-[#003580] text-[#003580]" />
                  <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-[#003580]" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[11px] font-mono text-white/30">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {EU_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FCFBF4] text-neutral-900 rounded-2xl p-5 flex flex-col justify-between border border-neutral-900/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Stars + date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.ratingValue ? "fill-[#003580] text-[#003580]" : "fill-neutral-200 text-neutral-200"}`} />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">{review.date}</span>
                </div>

                <p className="text-[15px] font-bold text-neutral-900 leading-snug mb-2">"{review.highlight}"</p>
                <p className="serif-display italic font-light text-[14px] text-neutral-500 leading-relaxed">{review.text}</p>
              </div>

              {/* Profile */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-neutral-900/8">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#003580]/20"
                    onError={e => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      const p = el.parentElement;
                      if (p) p.innerHTML = `<div style="width:40px;height:40px;border-radius:50%;background:#003580;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:14px;flex-shrink:0">${review.name[0]}</div>` + p.innerHTML;
                    }}
                  />
                  <div>
                    <p className="text-sm font-bold text-neutral-900 leading-none">{review.name}</p>
                    <p className="text-[12px] text-neutral-400 mt-0.5">{review.role} · {review.location}</p>
                  </div>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 bg-[#003580]/8 px-2 py-1 rounded-full shrink-0">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#003580]" />
                    <span className="text-[10px] font-black text-[#003580] uppercase tracking-wide">Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom badge */}
        <div className="mt-14 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-neutral-900 px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl sm:rounded-full border border-neutral-800 max-w-[280px] sm:max-w-none">
            <ShieldCheck className="w-5 h-5 text-white shrink-0" />
            <span className="serif-display italic font-light text-base sm:text-xl text-[#FCFBF4]">{t.testimonials.rate}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
