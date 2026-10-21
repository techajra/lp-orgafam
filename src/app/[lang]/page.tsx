import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BadgeCheck, Candy, Coffee, Droplet, Flower2, Ship, TreeDeciduous, Users, type LucideIcon } from 'lucide-react';
import PlaceholderVisual from '@/components/PlaceholderVisual';
import ProductTabs from '@/components/ProductTabs';
import { CONTENT } from '@/lib/content';
import { hasLocale, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';
import { pagePath } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang, null) : {};
}

// PLACEHOLDER: strip kolase foto di atas hero — ganti tiap kotak dengan foto produk/kebun.
const COLLAGE: { icon: LucideIcon; tint: string; label: Record<Locale, string> }[] = [
  { icon: Candy, tint: 'from-[#f8f3ea] to-[#ecdfc8]', label: { id: 'Gula kelapa', en: 'Coconut sugar' } },
  { icon: Droplet, tint: 'from-[#fff6dc] to-[#fde7a8]', label: { id: 'VCO', en: 'VCO' } },
  { icon: Coffee, tint: 'from-[#f6ece8] to-[#e6cfc6]', label: { id: 'Kopi Gayo', en: 'Gayo coffee' } },
  { icon: Flower2, tint: 'from-[#f3eefa] to-[#ddd0ef]', label: { id: 'Vanili', en: 'Vanilla' } },
  { icon: TreeDeciduous, tint: 'from-[#eef7e6] to-[#d5ebc2]', label: { id: 'Gaharu', en: 'Agarwood' } },
];

const STORY_ICONS: LucideIcon[] = [Users, Ship, BadgeCheck];
const STORY_TINTS = ['from-[#eef7e6] to-[#d5ebc2]', 'from-[#eaf7ff] to-[#c0e9ff]', 'from-[#fff6dc] to-[#fde7a8]'];

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = CONTENT[lang].home;

  return (
    <>
      {/* Kolase foto */}
      <section className="grid grid-cols-3 sm:grid-cols-5" aria-hidden>
        {COLLAGE.map((item, i) => (
          <PlaceholderVisual
            key={item.label.en}
            icon={item.icon}
            tint={item.tint}
            label={item.label[lang]}
            className={`aspect-[4/3] [&>span]:hidden sm:[&>span]:inline-block ${i > 2 ? 'hidden sm:flex' : ''}`}
          />
        ))}
      </section>

      {/* Banner promo utama */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-sky/10" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-10 size-64 rounded-full bg-sun/10" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sun">{c.heroEyebrow}</p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{c.heroTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{c.heroDesc}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={pagePath(lang, 'shop')}
              className="rounded-sm bg-sky px-7 py-3 text-sm font-semibold uppercase tracking-wide text-brand transition hover:bg-white"
            >
              {c.heroCta}
            </Link>
            <Link
              href={pagePath(lang, 'export')}
              className="rounded-sm border border-white/60 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              {c.heroCta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Jelajahi produk */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-medium text-brand sm:text-[44px] sm:leading-tight">{c.exploreTitle}</h2>
          <p className="mt-3 text-base sm:text-lg">{c.exploreDesc}</p>
        </div>
        <div className="mt-10">
          <ProductTabs />
        </div>
      </section>

      {/* Kartu cerita (pola kartu artikel di acuan) */}
      <section className="border-t border-line bg-sky-soft/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-medium text-brand sm:text-4xl">{c.storiesTitle}</h2>
            <p className="mt-3">{c.storiesDesc}</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {c.stories.map((story, i) => (
              <article key={story.slug} className="flex flex-col overflow-hidden rounded-md bg-white shadow-sm">
                <PlaceholderVisual
                  icon={STORY_ICONS[i]}
                  tint={STORY_TINTS[i]}
                  label={lang === 'id' ? 'Foto placeholder' : 'Placeholder photo'}
                  className="aspect-[16/10]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl font-medium text-brand">{story.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed">{story.text}</p>
                  <Link
                    href={pagePath(lang, story.slug)}
                    className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand hover:underline"
                  >
                    {c.readMore} <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA lebar penuh */}
      <section className="bg-sun/90">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-heading text-2xl font-bold text-brand-dark sm:text-3xl">{c.ctaTitle}</h2>
            <p className="mt-2 max-w-xl text-brand-dark/80">{c.ctaDesc}</p>
          </div>
          <Link
            href={pagePath(lang, 'export')}
            className="shrink-0 rounded-sm bg-brand px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-dark"
          >
            {c.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
