'use client';

import { createContext, useContext } from 'react';
import { DICTIONARIES, type Locale } from '@/lib/i18n';

const LocaleContext = createContext<Locale>('id');

export function LocaleProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const lang = useContext(LocaleContext);
  return { lang, t: DICTIONARIES[lang] };
}
