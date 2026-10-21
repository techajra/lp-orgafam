import type { Metadata } from 'next';
import { LOCALES, type Locale } from '@/lib/i18n';
import { pagePath } from '@/lib/site';

/** Metadata halaman dalam: judul (pakai template layout) + tautan versi bahasa lain. */
export function pageMetadata(lang: Locale, slug: string | null, title?: string, description?: string): Metadata {
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      canonical: pagePath(lang, slug),
      languages: Object.fromEntries(LOCALES.map((l) => [l, pagePath(l, slug)])),
    },
  };
}
