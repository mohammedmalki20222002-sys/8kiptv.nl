import { ShieldCheck, Clock, RefreshCw, AlertTriangle, Languages, Headphones, XCircle, CheckCircle2, MonitorSmartphone, CreditCard, FileText, Gift, Megaphone, Wrench } from "lucide-react";
import { WA_NUMBER } from "../types";

const GREEN = "#003580";

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. Terugbetalingsgarantie — 15 dagen",
    body: [
      "U heeft recht op een volledige terugbetaling binnen 15 dagen na activatie van uw abonnement, uitsluitend wanneer het abonnement zelf aantoonbaar niet werkt.",
      "\"Niet werkend\" betekent: ALLE zenders werken niet én ALLE films en series werken niet — niet één zender, niet één film, niet één categorie.",
      "De storing moet aan het abonnement (onze servers/lijn) liggen, niet aan uw app, uw apparaat, uw internetverbinding of uw netwerkinstellingen.",
    ],
  },
  {
    icon: XCircle,
    title: "2. Wanneer geldt de terugbetaling NIET?",
    body: [
      "Wanneer het probleem bij de applicatie, het apparaat, de smart-tv, de box, de router of de internetverbinding ligt.",
      "Wanneer slechts een deel van het aanbod niet werkt (bijvoorbeeld één zender, één wedstrijd, één film of één categorie).",
      "Wanneer u het abonnement simpelweg niet leuk vindt, van gedachten verandert of een andere aanbieder verkiest. Smaak of voorkeur is geen technische storing.",
      "Wanneer u weigert mee te werken aan de diagnose (screenshot, testen op een tweede apparaat, testen op een ander netwerk).",
      "Wanneer de inloggegevens zijn gedeeld met derden of op meer apparaten zijn gebruikt dan uw abonnement toestaat.",
      "Wij zijn niet verantwoordelijk voor problemen die buiten het abonnement liggen.",
    ],
  },
  {
    icon: MonitorSmartphone,
    title: "3. De app is niet inbegrepen",
    body: [
      "Wij leveren uitsluitend het abonnement (de lijn en de inloggegevens) — niet de applicatie.",
      "De speler/app koopt of activeert u zelf. Sommige apps zijn gratis, andere vragen een kleine eenmalige vergoeding aan de ontwikkelaar. Die kosten staan los van uw abonnement bij ons.",
      "Ons abonnement is compatibel met vrijwel alle IPTV-spelers, waaronder: HotPlayer, IBO Player (en IBO Pro), IPTV Smarters / Smarters Pro, TiviMate, Flix IPTV, Duplex Play, Net IPTV, XCIPTV, Televizo, Kodi en elke andere speler met Xtream Codes- of M3U-ondersteuning.",
      "Onze support helpt u kosteloos bij het installeren en instellen van de app van uw keuze.",
    ],
  },
  {
    icon: CreditCard,
    title: "4. Betaling en bestelproces",
    body: [
      "Het volledige bestelproces verloopt via WhatsApp. U neemt contact op met onze support en zij begeleiden u stap voor stap.",
      "Betaling gebeurt hoofdzakelijk via bankoverschrijving — deze methode is altijd beschikbaar.",
      "Andere betaalmethoden zijn niet permanent beschikbaar. Onze support laat u weten welke opties op dat moment openstaan.",
      "Onze prijzen zijn redelijk en vast: geen verborgen kosten, geen automatische verlenging, geen contract dat stilzwijgend doorloopt.",
    ],
  },
  {
    icon: FileText,
    title: "5. Factuur en contract na betaling",
    body: [
      "Na ontvangst van uw betaling sturen wij u een factuur/contract toe — als tekstbericht of als PDF-bestand.",
      "Daarin staan alle gegevens van uw abonnement: startdatum, einddatum, looptijd inclusief gratis maanden, aantal apparaten, betaald bedrag en uw inloggegevens.",
      "Bewaar dit document. Het geldt als uw bewijs bij elke vraag over verlenging, ondersteuning of terugbetaling.",
    ],
  },
  {
    icon: Gift,
    title: "6. Breng een klant aan — krijg gratis maanden",
    body: [
      "Verwijst u iemand naar ons door en sluit die persoon een abonnement af, dan belonen wij u met gratis maanden op uw eigen abonnement.",
      "Koopt uw aangebrachte klant het pakket van 12 + 3 maanden? Dan ontvangt u 1 maand gratis.",
      "Koopt hij of zij het pakket van 24 + 6 maanden? Dan ontvangt u 2 maanden gratis.",
      "Dit geldt voor zowel abonnementen met 1 apparaat als met 2 apparaten, en er is geen limiet: elke nieuwe klant die u aanbrengt telt mee.",
      "Laat de nieuwe klant uw naam of nummer noemen bij de bestelling, of meld het zelf via WhatsApp.",
    ],
  },
  {
    icon: Megaphone,
    title: "7. Maandelijkse promoties & ons WhatsApp-kanaal",
    body: [
      "Elke maand draaien wij promoties en tijdelijke aanbiedingen op verschillende pakketten.",
      "Volg ons op social media — en vooral op ons WhatsApp-kanaal — om deze acties als eerste te zien.",
      "Op het WhatsApp-kanaal melden wij ook alle updates, geplande onderhoudswerkzaamheden en storingsherstel, zodat u altijd weet wat er speelt.",
      "Abonneren op het kanaal is gratis en volledig vrijblijvend.",
    ],
  },
  {
    icon: Wrench,
    title: "8. Storing of verbindingsfout?",
    body: [
      "Krijgt u een verbindingsfout of hapert de server? Geen paniek — neem gewoon contact op met de support.",
      "Onderhoud en herstel gebeuren wekelijks, dus problemen worden snel en structureel opgelost.",
      "In de meeste gevallen helpt de support u direct verder met een andere server of een aangepaste instelling, zonder dat u iets hoeft te doen.",
    ],
  },
  {
    icon: Headphones,
    title: "9. 24/7 klantenservice",
    body: [
      "Onze support is 24 uur per dag, 7 dagen per week bereikbaar via WhatsApp.",
      "Voordat er sprake kan zijn van terugbetaling, krijgt u altijd eerst technische ondersteuning: wij testen de lijn, controleren de server en helpen bij de installatie.",
      "In veruit de meeste gevallen is een probleem binnen enkele minuten opgelost door een andere app, een andere server of een correcte instelling.",
    ],
  },
  {
    icon: RefreshCw,
    title: "10. Permanente updates",
    body: [
      "Het zenderaanbod en de servers worden permanent onderhouden en bijgewerkt, zonder extra kosten voor u.",
      "De VOD-bibliotheek (films en series) wordt per kwartaal bijgewerkt — vier updates per jaar.",
      "Nieuwe zenders, nieuwe categorieën en verbeteringen aan de streamkwaliteit worden automatisch aan uw bestaande abonnement toegevoegd.",
    ],
  },
  {
    icon: Clock,
    title: "11. Films op aanvraag",
    body: [
      "Ontbreekt er een film of serie in de bibliotheek? U kunt deze bij ons aanvragen via WhatsApp.",
      "Aanvragen worden meegenomen in de eerstvolgende kwartaalupdate. Er geldt dus een wachttijd tot de volgende update-cyclus.",
      "Wij doen ons uiterste best, maar kunnen niet garanderen dat elke aangevraagde titel beschikbaar komt.",
    ],
  },
  {
    icon: Languages,
    title: "12. Nederlandse audio en ondertiteling",
    body: [
      "Niet alle films en series zijn beschikbaar met Nederlandse audio (nasynchronisatie).",
      "Een groot deel van de internationale content wordt aangeboden in de originele taal (meestal Engels), afhankelijk van de bron.",
      "Nederlandse ondertiteling is voor veel titels beschikbaar, maar niet voor de volledige catalogus.",
      "Alle Nederlandse zenders en de Nederlandse content worden uiteraard in het Nederlands uitgezonden.",
      "Het ontbreken van Nederlandse audio of ondertiteling bij een individuele titel is geen technische storing en geeft geen recht op terugbetaling.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "13. Uw verantwoordelijkheid",
    body: [
      "Een stabiele internetverbinding van minimaal 25 Mbps (aanbevolen 50 Mbps of meer voor 4K/8K) is vereist.",
      "U bent zelf verantwoordelijk voor uw apparatuur, uw app en uw netwerk.",
      "Het delen van uw inloggegevens leidt tot directe blokkering zonder terugbetaling.",
      "De dienst is uitsluitend bestemd voor privégebruik in de huiselijke kring.",
    ],
  },
  {
    icon: CheckCircle2,
    title: "14. Hoe vraagt u een terugbetaling aan?",
    body: [
      "Neem binnen 15 dagen na activatie contact op via WhatsApp.",
      "Vermeld uw bestelnummer, het gebruikte apparaat en de app die u gebruikt.",
      "Voeg een korte video of screenshot toe waarop te zien is dat geen enkele zender en geen enkele film speelt.",
      "Na bevestiging door onze technische dienst wordt het bedrag binnen 5 tot 10 werkdagen teruggestort op dezelfde betaalmethode.",
    ],
  },
];

export default function Terms() {
  return (
    <section className="px-4 md:px-8 max-w-4xl mx-auto w-full py-6 md:py-10">
      {/* Hero — logo + title */}
      <div className="relative rounded-3xl overflow-hidden mb-10 px-6 py-12 md:px-12 md:py-16 text-center"
        style={{ background: "linear-gradient(150deg, #070b14 0%, #0d1a30 45%, #070b14 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[360px] rounded-full opacity-25"
            style={{ background: `radial-gradient(ellipse, ${GREEN} 0%, transparent 65%)` }} />
        </div>

        <div className="relative z-10">
          {/* 8K IPTV wordmark */}
          <div className="inline-flex items-baseline px-6 py-3 rounded-2xl mb-6 select-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <span style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900, fontSize: 34, color: "rgba(255,255,255,0.5)", letterSpacing: "-0.02em", lineHeight: 1 }}>8K</span>
            <span style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900, fontSize: 34, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1, marginLeft: 6 }}>IPTV</span>
          </div>

          <span className="serif-display italic font-light text-lg md:text-xl text-white/60 block mb-2">
            Klantbescherming
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-white mb-4">
            Voorwaarden &amp;<br className="hidden md:block" /> klantbescherming
          </h1>
          <p className="serif-display italic font-light text-base md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            Wij zijn volledig transparant over wat u wel en niet van uw 8K IPTV-abonnement mag
            verwachten. Lees dit vóór uw bestelling — zo weet u precies waar u aan toe bent.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["15 dagen garantie", "24/7 support", "Wekelijks onderhoud", "Vaste prijzen"].map(chip => (
              <span key={chip}
                className="px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider text-white/80"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 md:p-6 mb-10"
        style={{ background: "rgba(0,53,128,0.06)", border: "1px solid rgba(0,53,128,0.22)" }}>
        <p className="text-[15px] font-bold text-neutral-900 leading-relaxed">
          Kort samengevat: 15 dagen geld terug als het abonnement écht niet werkt (alle zenders
          én alle films), 24/7 support, permanente updates en wekelijks onderhoud. Bestellen en
          betalen gaat via WhatsApp; de app-speler is niet inbegrepen. Voor elke klant die u
          aanbrengt krijgt u gratis maanden.
        </p>
      </div>

      <div className="space-y-6">
        {SECTIONS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl p-5 md:p-7 bg-white"
            style={{ border: "1px solid rgba(0,53,128,0.15)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,53,128,0.10)", border: "1px solid rgba(0,53,128,0.25)" }}>
                <Icon className="w-4.5 h-4.5" style={{ color: GREEN, width: 18, height: 18 }} />
              </span>
              <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-neutral-900">
                {title}
              </h2>
            </div>
            <ul className="space-y-2.5">
              {body.map((line, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-neutral-700">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: GREEN }} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl p-6 md:p-8 text-center"
        style={{ background: "linear-gradient(160deg, #0a0f1c 0%, #0e1a30 50%, #0a0f1c 100%)" }}>
        <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">Nog vragen?</h2>
        <p className="serif-display italic font-light text-lg text-white/75 mb-6">
          Onze klantenservice is 24/7 bereikbaar en antwoordt meestal binnen enkele minuten.
          Bestellen, betalen en installeren doen wij samen met u via WhatsApp.
        </p>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hallo, ik heb een vraag over de voorwaarden en de terugbetaling.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white no-underline transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #1e4fd8 0%, #2563eb 100%)", boxShadow: "0 4px 20px rgba(30,79,216,0.4)" }}
        >
          Contact via WhatsApp
        </a>
      </div>

      <p className="text-sm text-neutral-500 mt-8 leading-relaxed">
        Laatst bijgewerkt: september 2026. Door een abonnement af te sluiten verklaart u akkoord te
        gaan met bovenstaande voorwaarden.
      </p>
    </section>
  );
}
