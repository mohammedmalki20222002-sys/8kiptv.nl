import { useState } from "react";
import { useLanguage } from "../LanguageContext";

const videoSections: Record<string, { heading: string; headingItalic: string; subtitle: string }> = {
  fi: {
    heading: "Kaikki mitä tarvitset,",
    headingItalic: "yhdessä paikassa.",
    subtitle: "Yli 89 000 live-kanavaa ja 200 000+ VOD — heti kaikilla laitteilla, ilman sopimusta.",
  },
  en: {
    heading: "Everything you need,",
    headingItalic: "in one place.",
    subtitle: "Over 89,000 live channels and 200,000+ VOD — instantly on any device, no contract.",
  },
  fr: {
    heading: "Tout ce dont vous avez besoin,",
    headingItalic: "en un seul endroit.",
    subtitle: "Plus de 89 000 chaînes en direct et 200 000+ VOD — instantanément sur tous vos appareils, sans contrat.",
  },
  da: {
    heading: "Alt hvad du har brug for,",
    headingItalic: "på ét sted.",
    subtitle: "Over 89.000 live-kanaler og 200.000+ VOD — øjeblikkeligt på alle enheder, ingen kontrakt.",
  },
  ar: {
    heading: "كل ما تحتاجه,",
    headingItalic: "في مكان واحد.",
    subtitle: "أكثر من 89,000 قناة مباشرة وأكثر من 200,000 VOD — فوراً على أي جهاز، بدون عقد.",
  },
  nl: {
    heading: "Alles wat je nodig hebt,",
    headingItalic: "op één plek.",
    subtitle: "Meer dan 89.000 live-zenders en 200.000+ VOD — direct op elk apparaat, geen contract.",
  },
  de: {
    heading: "Alles was du brauchst,",
    headingItalic: "an einem Ort.",
    subtitle: "Über 89.000 Live-Kanäle und 200.000+ VOD — sofort auf jedem Gerät, kein Vertrag.",
  },
  es: {
    heading: "Todo lo que necesitas,",
    headingItalic: "en un solo lugar.",
    subtitle: "Más de 89.000 canales en directo y 200.000+ VOD — al instante en cualquier dispositivo, sin contrato.",
  },
  it: {
    heading: "Tutto ciò che ti serve,",
    headingItalic: "in un unico posto.",
    subtitle: "Oltre 89.000 canali live e 200.000+ VOD — immediatamente su qualsiasi dispositivo, senza contratto.",
  },
  sv: {
    heading: "Allt du behöver,",
    headingItalic: "på ett ställe.",
    subtitle: "Över 89 000 livekanaler och 200 000+ VOD — direkt på alla enheter, inget kontrakt.",
  },
  no: {
    heading: "Alt du trenger,",
    headingItalic: "på ett sted.",
    subtitle: "Over 89 000 live-kanaler og 200 000+ VOD — umiddelbart på alle enheter, ingen kontrakt.",
  },
  pl: {
    heading: "Wszystko czego potrzebujesz,",
    headingItalic: "w jednym miejscu.",
    subtitle: "Ponad 89 000 kanałów na żywo i 200 000+ VOD — natychmiast na każdym urządzeniu, bez umowy.",
  },
  pt: {
    heading: "Tudo o que precisas,",
    headingItalic: "num só lugar.",
    subtitle: "Mais de 89 000 canais ao vivo e 200 000+ VOD — instantaneamente em qualquer dispositivo, sem contrato.",
  },
};

export default function VideoShowcase() {
  const { lang } = useLanguage();
  const [videoFailed, setVideoFailed] = useState(false);
  const tx = videoSections[lang] ?? videoSections.en;

  return (
    <>
      {/* Same container as Hero/other sections — constrained, padded, rounded */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-4">
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          {!videoFailed ? (
            <video
              src="/serien-und-filme.mp4"
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoFailed(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900 rounded-2xl" />
          )}

          {/* Top gradient for text legibility */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.15) 45%, transparent 80%)",
            }}
          />

          {/* Text overlay — top-left */}
          <div className="absolute top-0 left-0 px-5 pt-5 sm:px-8 sm:pt-7 md:px-10 md:pt-9">
            <h2 className="text-white font-extrabold tracking-tight leading-[1.05] text-lg sm:text-2xl md:text-4xl lg:text-5xl drop-shadow-lg">
              {tx.heading}
              <br />
              <span className="serif-display font-light italic text-white/75">
                {tx.headingItalic}
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* Subtitle below */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto w-full pb-4 text-center">
        <p className="serif-display italic font-light text-base sm:text-lg md:text-xl text-neutral-500 leading-relaxed">
          {tx.subtitle}
        </p>
      </div>
    </>
  );
}
