import { notFound } from 'next/navigation';
import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';
import PageBanner from '@/components/PageBanner';
import PlaceholderVisual from '@/components/PlaceholderVisual';
import { CONTENT } from '@/lib/content';
import { DICTIONARIES, hasLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';
import { SITE, waLink } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[lang]/contact'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = CONTENT[lang].contact;
  return pageMetadata(lang, 'contact', c.title, c.desc);
}

export default async function ContactPage({ params }: PageProps<'/[lang]/contact'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = CONTENT[lang].contact;
  const t = DICTIONARIES[lang];

  const items = [
    { icon: MessageCircle, label: 'WhatsApp', value: `+${SITE.waNumber}`, href: waLink(t.waGreeting) },
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: c.addressLabel, value: SITE.address },
    { icon: Clock, label: c.hoursLabel, value: c.hours },
  ];

  return (
    <>
      <PageBanner lang={lang} title={c.title} desc={c.desc} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-heading text-2xl font-medium text-brand">{c.infoTitle}</h2>
          <ul className="mt-6 space-y-5">
            {items.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sky-soft text-brand">
                  <Icon className="size-5" />
                </span>
                <div className="text-sm">
                  <p className="font-semibold uppercase tracking-wide text-brand">{label}</p>
                  {href ? (
                    <a href={href} className="mt-0.5 block break-all hover:text-brand hover:underline">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <PlaceholderVisual icon={MapPin} label={c.mapPlaceholder} className="mt-8 aspect-[16/9] rounded-md" />
        </div>

        <div className="rounded-md border border-line p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-medium text-brand">{c.formTitle}</h2>
          <div className="mt-6">
            <InquiryForm variant="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
