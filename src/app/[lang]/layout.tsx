import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Cabin, Poppins } from 'next/font/google';
import { DICTIONARIES, LOCALES, hasLocale } from '@/lib/i18n';
import '../globals.css';

const sans = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-of-sans' });
const heading = Cabin({ subsets: ['latin'], variable: '--font-of-heading' });

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = DICTIONARIES[lang];
  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: { id: '/id', en: '/en' } },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${sans.variable} ${heading.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
