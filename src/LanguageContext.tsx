import { createContext, useContext, ReactNode } from "react";
import { LangCode, SITE_LANG, LANGUAGES, translations, T } from "./i18n";

interface LanguageContextValue {
  lang: LangCode;
  t: T;
  dir: 'ltr' | 'rtl';
}

const dirFor = (l: LangCode): 'ltr' | 'rtl' =>
  LANGUAGES.find(x => x.code === l)?.dir ?? 'ltr';

const LanguageContext = createContext<LanguageContextValue>({
  lang: SITE_LANG,
  t: translations[SITE_LANG],
  dir: dirFor(SITE_LANG),
});

/**
 * The site ships in Dutch only — there is no language switcher. The context is kept
 * so components can keep reading `t` / `dir` without change, and so the blog can
 * still render the English fixed-language posts through the same translation maps.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageContext.Provider
      value={{ lang: SITE_LANG, t: translations[SITE_LANG], dir: dirFor(SITE_LANG) }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
