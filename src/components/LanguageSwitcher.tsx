import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LANGUAGES } from "../i18n";
import { useLanguage } from "../LanguageContext";

const flagSrc = (code: string) => `https://flagcdn.com/w40/${code}.png`;

/**
 * Header language picker, shown at every breakpoint. Switching is purely
 * client-side — the URL never changes — so the prerendered Dutch HTML and its
 * canonical stay intact for crawlers.
 */
export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Taal: ${current.label}`}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Globe className="w-4 h-4 opacity-70 hidden lg:block" />
        <img
          src={flagSrc(current.flag)}
          alt=""
          width={20}
          height={14}
          className="w-5 h-3.5 object-cover rounded-[2px] shadow"
        />
        <span className="text-[11px] font-bold uppercase tracking-wide">{current.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Taal kiezen"
          className="absolute z-50 top-full mt-2 end-0 w-52 max-h-[70vh] overflow-y-auto rounded-2xl border border-white/10 p-1.5 shadow-2xl"
          style={{ background: "linear-gradient(160deg, #0d1220 0%, #111827 100%)" }}
        >
          {LANGUAGES.map(l => {
            const active = l.code === lang;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-colors ${
                    active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <img
                    src={flagSrc(l.flag)}
                    alt=""
                    width={20}
                    height={14}
                    className="w-5 h-3.5 object-cover rounded-[2px] shadow shrink-0"
                  />
                  <span className="flex-grow text-start">{l.label}</span>
                  {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
