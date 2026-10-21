import type { Locale } from '@/lib/i18n';

// Daftar produk Orgafarm. `price` adalah harga jual dalam Rupiah (sudah termasuk
// markup); versi Inggris menampilkannya dalam USD memakai USD_RATE di i18n.ts.
// Untuk memakai foto asli: taruh file di public/products/ lalu isi `image`, mis.
// image: '/products/gula-semut.jpg'. Selama `image` kosong, kartu menampilkan
// gambar placeholder bertanda jelas.

export type CategoryId = 'gula' | 'minyak' | 'rempah' | 'kopi' | 'gaharu';

type Localized = Record<Locale, string>;

export type Product = {
  id: string;
  name: Localized;
  note?: Localized;
  category: CategoryId;
  price: number;
  unit: 'kg' | 'liter';
  compareAtPrice?: number;
  /** Isi hanya dengan rating dari ulasan sungguhan; kalau kosong, bintang tidak ditampilkan. */
  rating?: { value: number; count: number };
  inStock: boolean;
  badge?: Localized;
  image?: string;
  /** Urutan "Unggulan" (semakin kecil semakin depan). */
  featured: number;
};

export const CATEGORIES: { id: CategoryId; label: Localized }[] = [
  { id: 'gula', label: { id: 'Gula Kelapa', en: 'Coconut Sugar' } },
  { id: 'minyak', label: { id: 'Minyak Kelapa', en: 'Coconut Oil' } },
  { id: 'rempah', label: { id: 'Rempah', en: 'Spices' } },
  { id: 'kopi', label: { id: 'Kopi', en: 'Coffee' } },
  { id: 'gaharu', label: { id: 'Gaharu', en: 'Agarwood' } },
];

const ORGANIC: Localized = { id: 'Organik', en: 'Organic' };
const EU_MARKET: Localized = { id: 'Organik · pasar Eropa', en: 'Organic · EU market' };

export const PRODUCTS: Product[] = [
  {
    id: 'gula-semut',
    name: { id: 'Gula Kelapa Semut Organik', en: 'Organic Coconut Sugar (Granulated)' },
    note: EU_MARKET,
    category: 'gula',
    price: 42900,
    unit: 'kg',
    inStock: true,
    badge: ORGANIC,
    featured: 1,
  },
  {
    id: 'gula-batok',
    name: { id: 'Gula Kelapa Batok Organik', en: 'Organic Coconut Sugar (Block)' },
    note: EU_MARKET,
    category: 'gula',
    price: 33800,
    unit: 'kg',
    inStock: true,
    badge: ORGANIC,
    featured: 2,
  },
  {
    id: 'vco',
    name: { id: 'Virgin Coconut Oil (VCO)', en: 'Virgin Coconut Oil (VCO)' },
    category: 'minyak',
    price: 84500,
    unit: 'liter',
    inStock: true,
    featured: 3,
  },
  {
    id: 'minyak-kelapa',
    name: { id: 'Minyak Kelapa', en: 'Coconut Oil' },
    category: 'minyak',
    price: 45500,
    unit: 'liter',
    inStock: true,
    featured: 4,
  },
  {
    id: 'kopi-gayo',
    name: { id: 'Kopi Gayo Aceh', en: 'Gayo Aceh Coffee' },
    category: 'kopi',
    price: 26000,
    unit: 'kg',
    inStock: true,
    featured: 5,
  },
  {
    id: 'vanili',
    name: { id: 'Vanili', en: 'Vanilla' },
    category: 'rempah',
    price: 1950000,
    unit: 'kg',
    inStock: true,
    featured: 6,
  },
  {
    id: 'gaharu',
    name: { id: 'Gaharu', en: 'Agarwood (Gaharu)' },
    category: 'gaharu',
    price: 6500000,
    unit: 'kg',
    inStock: true,
    featured: 7,
  },
];

/** Rentang filter harga per bahasa, dalam mata uang yang tampil (IDR / USD). */
export const PRICE_RANGES: Record<Locale, { id: string; label: string; min: number; max: number }[]> = {
  id: [
    { id: 'low', label: 'Di bawah Rp50.000', min: 0, max: 49999 },
    { id: 'mid', label: 'Rp50.000 – Rp1.000.000', min: 50000, max: 1000000 },
    { id: 'high', label: 'Di atas Rp1.000.000', min: 1000001, max: Infinity },
  ],
  en: [
    { id: 'low', label: 'Under $3', min: 0, max: 2.99 },
    { id: 'mid', label: '$3 – $60', min: 3, max: 60 },
    { id: 'high', label: 'Over $60', min: 60.01, max: Infinity },
  ],
};

export type SortId = 'featured' | 'price-asc' | 'price-desc' | 'az' | 'za';

export const SORT_IDS: SortId[] = ['featured', 'price-asc', 'price-desc', 'az', 'za'];
