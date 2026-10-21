import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BadgeCheck, FlaskConical, Leaf, ShieldCheck } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import { CONTENT } from '@/lib/content';
import { hasLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';
import { pagePath } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[lang]/certification'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = CONTENT[lang].certification;
  return pageMetadata(lang, 'certification', c.title, c.desc);
}

const ICONS = [Leaf, BadgeCheck, ShieldCheck, FlaskConical];

export default async function CertificationPage({ params }: PageProps<'/[lang]/certification'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = CONTENT[lang].certification;

  return (
    <>
      <PageBanner lang={lang} title={c.title} desc={c.desc} />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="mx-auto max-w-2xl rounded-md border border-dashed border-sun bg-sun/10 px-5 py-4 text-center text-sm leading-relaxed text-brand-dark">
          {c.intro}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {c.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div key={item.title} className="flex gap-4 rounded-md border border-line p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sky-soft text-brand">
                  <Icon className="size-6" strokeWidth={1.7} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-heading text-lg font-medium text-brand">{item.title}</h2>
                    <span className="rounded-full bg-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
                      {c.placeholderTag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center">
          <Link href={pagePath(lang, 'contact')} className="font-medium text-brand underline underline-offset-4">
            {c.requestDocs}
          </Link>
        </p>
      </section>
    </>
  );
}
