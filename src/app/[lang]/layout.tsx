import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Cabin, Poppins } from 'next/font/google';
import { CartProvider } from '@/components/CartProvider';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LocaleProvider } from '@/components/LocaleProvider';
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
    title: { default: meta.title, template: '%s — Orgafarm' },
    description: meta.description,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${sans.variable} ${heading.variable}`}>
      <body className="font-sans">
        <LocaleProvider lang={lang}>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer lang={lang} />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
