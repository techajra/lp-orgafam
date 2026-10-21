import { notFound } from 'next/navigation';
import Catalog from '@/components/Catalog';
import PageBanner from '@/components/PageBanner';
import { DICTIONARIES, hasLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: PageProps<'/[lang]/shop'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = DICTIONARIES[lang];
  return pageMetadata(lang, 'shop', t.collectionTitle, t.collectionDesc);
}

export default async function ShopPage({ params }: PageProps<'/[lang]/shop'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = DICTIONARIES[lang];

  return (
    <>
      <PageBanner lang={lang} title={t.collectionTitle} desc={t.collectionDesc} />
      <Catalog />
    </>
  );
}
