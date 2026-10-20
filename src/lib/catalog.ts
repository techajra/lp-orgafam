// ─── PLACEHOLDER — seluruh isi file ini contoh, ganti dengan data Orgafarm asli ───
// Nama produk, harga, rating, stok, dan kategori di bawah hanya pengisi tata letak.
// Untuk memakai foto asli: taruh file di public/products/ lalu isi `image`, mis.
// image: '/products/minyak-kelapa.jpg'. Selama `image` kosong, kartu menampilkan
// gambar placeholder bertanda "FOTO PLACEHOLDER".

export type CategoryId = 'minyak' | 'biji' | 'tepung' | 'beras' | 'pemanis' | 'rempah';

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  /** Harga dalam Rupiah. Kalau ada beberapa ukuran, isi harga termurah dan set `hasVariants`. */
  price: number;
  compareAtPrice?: number;
  hasVariants?: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: 'Baru' | 'Terlaris' | 'Hemat';
  image?: string;
  /** Urutan "Unggulan" (semakin kecil semakin depan). */
  featured: number;
  /** Tanggal rilis untuk urutan "Terbaru" (YYYY-MM-DD). */
  addedAt: string;
};

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'minyak', label: 'Minyak & Lemak' },
  { id: 'biji', label: 'Biji-bijian' },
  { id: 'tepung', label: 'Tepung' },
  { id: 'beras', label: 'Beras' },
  { id: 'pemanis', label: 'Madu & Pemanis' },
  { id: 'rempah', label: 'Rempah & Bumbu' },
];

export const PRODUCTS: Product[] = [
  { id: 'p01', name: 'Minyak Kelapa Organik', category: 'minyak', price: 45000, hasVariants: true, rating: 4.8, reviews: 126, inStock: true, badge: 'Terlaris', featured: 1, addedAt: '2026-03-02' },
  { id: 'p02', name: 'Biji Chia Organik', category: 'biji', price: 38000, rating: 4.7, reviews: 84, inStock: true, featured: 2, addedAt: '2026-05-10' },
  { id: 'p03', name: 'Tepung Mocaf', category: 'tepung', price: 22000, rating: 4.5, reviews: 41, inStock: true, featured: 3, addedAt: '2026-06-21' },
  { id: 'p04', name: 'Beras Merah Organik 2 kg', category: 'beras', price: 64000, compareAtPrice: 72000, rating: 4.9, reviews: 203, inStock: true, badge: 'Hemat', featured: 4, addedAt: '2026-01-15' },
  { id: 'p05', name: 'Madu Hutan Murni', category: 'pemanis', price: 85000, hasVariants: true, rating: 4.8, reviews: 97, inStock: true, featured: 5, addedAt: '2026-04-04' },
  { id: 'p06', name: 'Biji Rami (Flaxseed) Giling', category: 'biji', price: 34000, rating: 4.4, reviews: 29, inStock: false, featured: 6, addedAt: '2026-02-18' },
  { id: 'p07', name: 'Gula Aren Bubuk', category: 'pemanis', price: 28000, rating: 4.6, reviews: 58, inStock: true, featured: 7, addedAt: '2026-08-01' },
  { id: 'p08', name: 'Kunyit Bubuk Organik', category: 'rempah', price: 19000, rating: 4.3, reviews: 17, inStock: true, badge: 'Baru', featured: 8, addedAt: '2026-09-12' },
  { id: 'p09', name: 'Minyak Kelapa untuk Memasak 1 L', category: 'minyak', price: 52000, rating: 4.7, reviews: 66, inStock: true, featured: 9, addedAt: '2026-07-07' },
  { id: 'p10', name: 'Tepung Beras Merah', category: 'tepung', price: 24000, rating: 4.2, reviews: 12, inStock: true, featured: 10, addedAt: '2026-05-28' },
  { id: 'p11', name: 'Beras Hitam Organik 1 kg', category: 'beras', price: 48000, rating: 4.8, reviews: 74, inStock: false, featured: 11, addedAt: '2026-03-30' },
  { id: 'p12', name: 'Jahe Merah Kering', category: 'rempah', price: 26000, rating: 4.5, reviews: 23, inStock: true, badge: 'Baru', featured: 12, addedAt: '2026-10-01' },
];

export const PRICE_RANGES = [
  { id: 'lt25', label: 'Di bawah Rp25.000', min: 0, max: 24999 },
  { id: '25-50', label: 'Rp25.000 – Rp50.000', min: 25000, max: 50000 },
  { id: 'gt50', label: 'Di atas Rp50.000', min: 50001, max: Infinity },
] as const;

export type SortId = 'featured' | 'best' | 'price-asc' | 'price-desc' | 'az' | 'za' | 'newest';

export const SORT_OPTIONS: { id: SortId; label: string }[] = [
  { id: 'featured', label: 'Unggulan' },
  { id: 'best', label: 'Terlaris' },
  { id: 'price-asc', label: 'Harga: rendah ke tinggi' },
  { id: 'price-desc', label: 'Harga: tinggi ke rendah' },
  { id: 'az', label: 'Nama: A–Z' },
  { id: 'za', label: 'Nama: Z–A' },
  { id: 'newest', label: 'Terbaru' },
];

export function formatRupiah(value: number) {
  return 'Rp' + value.toLocaleString('id-ID');
}
