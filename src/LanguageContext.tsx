import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { LangCode, SITE_LANG, LANGUAGES, isSupportedLang, translations, T } from "./i18n";

/** Where the visitor's chosen language is remembered between visits. */
const STORAGE_KEY = "8kiptv.lang";

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: T;
  dir: 'ltr' | 'rtl';
}

const dirFor = (l: LangCode): 'ltr' | 'rtl' =>
  LANGUAGES.find(x => x.code === l)?.dir ?? 'ltr';

const LanguageContext = createContext<LanguageContextValue>({
  lang: SITE_LANG,
  setLang: () => {},
  t: translations[SITE_LANG],
  dir: dirFor(SITE_LANG),
});

/**
 * The initial language is the one the visitor picked last time, or Dutch.
 * It is deliberately *not* sniffed from `navigator.language`: the pages are
 * prerendered in Dutch and canonicalised as Dutch, so Googlebot (which reports
 * en-US) must keep seeing the Dutch copy it indexed.
 */
function initialLang(): LangCode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isSupportedLang(stored)) return stored;
  } catch {
    // Private mode / blocked storage — fall through to the site language.
  }
  return SITE_LANG;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(initialLang);

  const setLang = useCallback((next: LangCode) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Nothing to do — the choice simply won't survive a reload.
    }
  }, []);

  // Keep the document in sync so screen readers, hyphenation and RTL mirroring
  // follow the copy that is actually on screen.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dirFor(lang);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: translations[lang], dir: dirFor(lang) }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
