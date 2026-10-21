import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HandHeart, Leaf, ShieldCheck, Users } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import PlaceholderVisual from '@/components/PlaceholderVisual';
import { CONTENT } from '@/lib/content';
import { DICTIONARIES, hasLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';
import { pagePath } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[lang]/about'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = CONTENT[lang].about;
  return pageMetadata(lang, 'about', c.title, c.desc);
}

const VALUE_ICONS = [HandHeart, Leaf, ShieldCheck];

export default async function AboutPage({ params }: PageProps<'/[lang]/about'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = CONTENT[lang].about;
  const home = CONTENT[lang].home;
  const t = DICTIONARIES[lang];

  return (
    <>
      <PageBanner lang={lang} title={c.title} desc={c.desc} />

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
        <PlaceholderVisual
          icon={Users}
          label={lang === 'id' ? 'Foto petani / kebun' : 'Farmer / farm photo'}
          tint="from-[#eef7e6] to-[#d5ebc2]"
          className="aspect-[4/3] rounded-md"
        />
        <div>
          <h2 className="font-heading text-3xl font-medium text-brand">{c.storyTitle}</h2>
          <div className="mt-5 space-y-4 leading-relaxed">
            {c.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sky-soft/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-medium text-brand">{c.valuesTitle}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {c.values.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div key={v.title} className="rounded-md bg-white p-6 text-center shadow-sm">
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-sky-soft text-brand">
                    <Icon className="size-7" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-medium text-brand">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-heading text-2xl font-medium text-brand sm:text-3xl">{home.ctaTitle}</h2>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={pagePath(lang, 'shop')} className="rounded-sm bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand-dark">
            {t.nav[0]}
          </Link>
          <Link
            href={pagePath(lang, 'export')}
            className="rounded-sm border border-brand px-6 py-3 text-sm font-medium text-brand hover:bg-brand hover:text-white"
          >
            {home.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
