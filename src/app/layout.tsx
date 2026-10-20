import type { Metadata } from 'next';
import { Cabin, Poppins } from 'next/font/google';
import './globals.css';

const sans = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-of-sans' });
const heading = Cabin({ subsets: ['latin'], variable: '--font-of-heading' });

// PLACEHOLDER: judul & deskripsi situs — ganti setelah profil Orgafarm final.
export const metadata: Metadata = {
  title: 'Orgafarm — Produk Organik & Hasil Tani',
  description: 'Katalog produk organik Orgafarm: minyak, biji-bijian, tepung, beras, madu, dan rempah pilihan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${sans.variable} ${heading.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
