import { notFound } from 'next/navigation';
import { ClipboardList, Factory, PackageCheck, Ship } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';
import PageBanner from '@/components/PageBanner';
import { CONTENT } from '@/lib/content';
import { PRODUCTS } from '@/lib/catalog';
import { DICTIONARIES, hasLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: PageProps<'/[lang]/export'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = CONTENT[lang].export;
  return pageMetadata(lang, 'export', c.title, c.desc);
}

const STEP_ICONS = [ClipboardList, PackageCheck, Factory, Ship];

export default async function ExportPage({ params }: PageProps<'/[lang]/export'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = CONTENT[lang].export;
  const t = DICTIONARIES[lang];

  return (
    <>
      <PageBanner lang={lang} title={c.title} desc={c.desc} />

      <section className="mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-medium text-brand">{c.introTitle}</h2>
        <p className="mt-4 leading-relaxed">{c.intro}</p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-center font-heading text-2xl font-medium text-brand">{c.stepsTitle}</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li key={step.title} className="relative rounded-md border border-line p-6">
                <span className="absolute right-4 top-4 font-heading text-3xl font-bold text-sky">{i + 1}</span>
                <Icon className="size-8 text-brand" strokeWidth={1.6} />
                <h3 className="mt-4 font-heading text-lg font-medium text-brand">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="border-y border-line bg-sky-soft/50">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-medium text-brand">{c.tableTitle}</h2>
          <div className="mt-8 overflow-x-auto rounded-md border border-line bg-white">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-brand text-white">
                <tr>
                  <th className="px-4 py-3 font-medium">{c.colProduct}</th>
                  <th className="px-4 py-3 font-medium">{c.colUnit}</th>
                  <th className="px-4 py-3 font-medium">{c.colMoq}</th>
                  <th className="px-4 py-3 font-medium">{c.colPack}</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => (
                  <tr key={p.id} className="border-t border-line">
                    <td className="px-4 py-3 font-medium text-brand">{p.name[lang]}</td>
                    <td className="px-4 py-3">{t.per[p.unit].replace('/ ', '')}</td>
                    {/* PLACEHOLDER: isi minimum order & kemasan per produk */}
                    <td className="px-4 py-3 text-ink/70">{c.tbd}</td>
                    <td className="px-4 py-3 text-ink/70">{c.tbd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-ink/80">{c.note}</p>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-3xl scroll-mt-32 px-4 py-16 sm:px-6">
        <h2 className="text-center font-heading text-3xl font-medium text-brand">{c.formTitle}</h2>
        <div className="mt-8 rounded-md border border-line p-6 sm:p-8">
          <InquiryForm variant="export" />
        </div>
      </section>
    </>
  );
}
