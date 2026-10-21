import Link from 'next/link';
import { ChevronRight, Leaf, Sprout, Wheat } from 'lucide-react';
import { DICTIONARIES, type Locale } from '@/lib/i18n';
import { pagePath } from '@/lib/site';

/** Banner judul halaman dalam: breadcrumb, judul, deskripsi (gaya banner koleksi). */
export default function PageBanner({ lang, title, desc }: { lang: Locale; title: string; desc?: string }) {
  const t = DICTIONARIES[lang];
  return (
    <section className="relative overflow-hidden bg-sky-soft">
      {/* PLACEHOLDER: latar dekoratif — bisa diganti foto banner per halaman. */}
      <div className="pointer-events-none absolute inset-0 text-brand/[0.07]" aria-hidden>
        <Sprout className="absolute -left-6 top-4 size-24 -rotate-12 sm:size-40" />
        <Wheat className="absolute -top-6 right-2 size-28 rotate-12 sm:right-10 sm:size-48" />
        <Leaf className="absolute bottom-[-30px] right-1/3 hidden size-32 sm:block" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-1.5 text-sm font-medium text-ink">
          <Link href={pagePath(lang)} className="hover:text-brand">
            {t.home}
          </Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <span className="text-brand" aria-current="page">
            {title}
          </span>
        </nav>
        <h1 className="font-heading text-3xl font-medium text-brand sm:text-4xl">{title}</h1>
        {desc && <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base">{desc}</p>}
      </div>
    </section>
  );
}
