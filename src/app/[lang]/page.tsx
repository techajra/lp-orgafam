import { notFound } from 'next/navigation';
import { ChevronRight, Leaf, Sprout, Wheat } from 'lucide-react';
import Catalog from '@/components/Catalog';
import { CartProvider } from '@/components/CartProvider';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LocaleProvider } from '@/components/LocaleProvider';
import { DICTIONARIES, hasLocale, type Locale } from '@/lib/i18n';

function CollectionBanner({ lang }: { lang: Locale }) {
  const t = DICTIONARIES[lang];
  return (
    <section className="relative overflow-hidden bg-sky-soft">
      {/* PLACEHOLDER: ganti latar dekoratif ini dengan foto banner koleksi (mis. kebun/hasil panen). */}
      <div className="pointer-events-none absolute inset-0 text-brand/[0.07]" aria-hidden>
        <Sprout className="absolute -left-6 top-4 size-24 -rotate-12 sm:size-40" />
        <Wheat className="absolute -top-6 right-2 size-28 rotate-12 sm:right-10 sm:size-48" />
        <Leaf className="absolute bottom-[-30px] right-1/3 hidden size-32 sm:block" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-1.5 text-sm font-medium text-ink">
          <a href={`/${lang}`} className="hover:text-brand">
            {t.home}
          </a>
          <ChevronRight className="size-3.5" aria-hidden />
          <span className="text-brand" aria-current="page">
            {t.collectionTitle}
          </span>
        </nav>
        <h1 className="font-heading text-3xl font-medium text-brand sm:text-4xl">{t.collectionTitle}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base">{t.collectionDesc}</p>
      </div>
    </section>
  );
}

export default async function CatalogPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <LocaleProvider lang={lang}>
      <CartProvider>
        <Header />
        <main>
          <CollectionBanner lang={lang} />
          <Catalog />
        </main>
        <Footer lang={lang} />
      </CartProvider>
    </LocaleProvider>
  );
}
