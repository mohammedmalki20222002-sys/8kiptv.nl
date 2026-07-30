import { ArrowRight } from "lucide-react";

interface AnnouncementProps {
  onPricingClick: () => void;
}

export default function Announcement({ onPricingClick }: AnnouncementProps) {
  return (
    <div className="flex flex-col gap-3 h-full">

      {/* ── Title ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="serif-display italic font-light text-xl text-neutral-400 whitespace-nowrap">Join Now</span>
      </div>

      {/* ── Card ────────────────────────────────────────────────── */}
      <div
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer group flex-1"
        style={{ minHeight: "260px" }}
        onClick={onPricingClick}
      >
        {/* Photo */}
        <div className="w-full h-full aspect-[4/5] sm:aspect-auto sm:absolute sm:inset-0">
          <img
            src="/wm-banner.png"
            alt="FIFA World Cup 2026"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(170deg, rgba(0,53,128,0.75) 0%, rgba(0,30,80,0.50) 35%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Decorative rings */}
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full border border-white/8 pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 z-10 p-4 sm:p-5 flex flex-col justify-between">

          {/* Top badge */}
          <span className="self-start serif-display italic font-light text-base text-white/60 border border-white/20 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
            FIFA World Cup 2026
          </span>

          {/* Bottom */}
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-white font-black leading-[1.06] tracking-[-0.02em] text-[1.15rem] sm:text-xl md:text-2xl drop-shadow-sm">
                Watch the{" "}
                <span className="serif-display italic font-light text-white/90">
                  FIFA World Cup
                </span>{" "}
                Live.
              </h3>
              <p className="text-white/60 text-[11px] sm:text-xs mt-1.5 leading-snug font-medium">
                All across Europe with us —{" "}
                <span className="serif-display italic text-white/80">be there!</span>
              </p>
            </div>

            <button
              onClick={e => { e.stopPropagation(); onPricingClick(); }}
              className="self-start flex items-center gap-2 bg-white text-[#003580] font-extrabold text-[11px] px-4 py-2 rounded-full
                         shadow-[0_3px_0_rgba(0,0,0,0.18)] active:translate-y-0.5 active:shadow-none
                         hover:bg-white/90 transition-all"
            >
              <span>Choose a plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
