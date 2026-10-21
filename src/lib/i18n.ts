// Teks antarmuka dua bahasa. Bahasa ditentukan dari URL (/id atau /en).
// Teks bertanda PLACEHOLDER masih contoh — ganti setelah profil Orgafarm final.

export const LOCALES = ['id', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Kurs tetap untuk menampilkan harga USD di versi Inggris (bukan kurs live). */
export const USD_RATE = 16500;

/** Harga dalam mata uang yang tampil untuk bahasa itu (IDR untuk id, USD untuk en). */
export function priceIn(idr: number, lang: Locale) {
  return lang === 'id' ? idr : idr / USD_RATE;
}

export function formatPrice(idr: number, lang: Locale) {
  if (lang === 'id') return 'Rp' + idr.toLocaleString('id-ID');
  return priceIn(idr, lang).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const id = {
  meta: {
    title: 'Orgafarm — Gula Kelapa, VCO, Rempah & Kopi Indonesia',
    description:
      'Katalog Orgafarm: gula kelapa organik, virgin coconut oil, minyak kelapa, vanili, gaharu, dan kopi Gayo Aceh.',
  },
  // PLACEHOLDER: kalimat promo bar atas
  announcement: 'Melayani pembelian eceran & partai besar untuk ekspor',
  tagline: 'Dari kebun Indonesia untuk dunia.',
  logoSub: 'organik',
  langLabel: 'Bahasa',
  nav: ['Belanja', 'Tentang', 'Ekspor', 'Sertifikasi', 'Kontak'],
  search: 'Cari produk...',
  cart: (n: number) => `Keranjang, ${n} barang`,
  account: 'Akun',
  login: 'Masuk / Daftar',
  openMenu: 'Buka menu',
  closeMenu: 'Tutup menu',
  home: 'Beranda',
  collectionTitle: 'Semua Produk',
  // PLACEHOLDER: deskripsi koleksi
  collectionDesc:
    'Gula kelapa organik, minyak kelapa, rempah, gaharu, dan kopi pilihan — siap untuk kebutuhan rumah tangga hingga ekspor.',
  productCount: (n: number) => `${n} produk`,
  sortBy: 'Urutkan:',
  sortLabel: 'Urutkan produk',
  sort: {
    featured: 'Unggulan',
    'price-asc': 'Harga: rendah ke tinggi',
    'price-desc': 'Harga: tinggi ke rendah',
    az: 'Nama: A–Z',
    za: 'Nama: Z–A',
  },
  filter: 'Filter',
  filterTitle: 'Saring',
  closeFilter: 'Tutup filter',
  availability: 'Ketersediaan',
  inStockOnly: 'Hanya yang tersedia',
  inStockChip: 'Tersedia',
  category: 'Kategori',
  price: 'Harga',
  clearAll: 'Hapus semua',
  clear: 'Hapus',
  remove: 'hapus',
  showResults: (n: number) => `Lihat ${n} produk`,
  noResults: 'Tidak ada produk yang cocok.',
  clearFilters: 'Hapus filter',
  addToCart: 'Tambah ke keranjang',
  buyShort: 'Beli',
  soldOut: 'Stok habis',
  addedToCart: 'ditambahkan ke keranjang.',
  photoPlaceholder: 'Foto placeholder',
  per: { kg: '/ kg', liter: '/ liter' },
  rating: (v: number, n: number) => `Rating ${v} dari 5, ${n} ulasan`,
  // PLACEHOLDER: strip info di atas footer
  wholesale: 'Butuh pasokan rutin atau partai ekspor?',
  wholesaleLink: 'Minta penawaran',
  quickLinks: 'Tautan cepat',
  footerLinks: ['Tentang Kami', 'Belanja', 'Ekspor', 'Sertifikasi', 'Kebijakan Pengembalian', 'Hubungi Kami'],
  // PLACEHOLDER: paragraf tentang Orgafarm
  footerAbout: [
    'Paragraf placeholder tentang Orgafarm: siapa kalian, asal bahan baku, dan petani mitra.',
    'Ganti dengan cerita singkat tentang proses produksi dan standar mutu untuk pasar ekspor.',
  ],
  stayInTouch: 'Tetap terhubung',
  newsletterDesc: 'Daftar newsletter Orgafarm untuk info produk baru, panen, dan penawaran ekspor.',
  email: 'Alamat email',
  subscribe: 'Daftar',
  subscribed: 'Terima kasih! Kamu sudah terdaftar.',
  waGreeting: 'Halo Orgafarm, saya mau tanya produk.',
};

export type Dictionary = typeof id;

const en: Dictionary = {
  meta: {
    title: 'Orgafarm — Indonesian Coconut Sugar, VCO, Spices & Coffee',
    description:
      'Orgafarm catalog: organic coconut sugar, virgin coconut oil, coconut oil, vanilla, agarwood, and Gayo Aceh coffee.',
  },
  announcement: 'Retail and bulk orders for export',
  tagline: 'From Indonesian farms to the world.',
  logoSub: 'organic',
  langLabel: 'Language',
  nav: ['Shop', 'About', 'Export', 'Certification', 'Contact'],
  search: 'Search products...',
  cart: (n: number) => `Cart, ${n} item${n === 1 ? '' : 's'}`,
  account: 'Account',
  login: 'Log in / Sign up',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  home: 'Home',
  collectionTitle: 'All Products',
  collectionDesc:
    'Organic coconut sugar, coconut oils, spices, agarwood, and specialty coffee — for your kitchen or your export order.',
  productCount: (n: number) => `${n} product${n === 1 ? '' : 's'}`,
  sortBy: 'Sort by:',
  sortLabel: 'Sort products',
  sort: {
    featured: 'Featured',
    'price-asc': 'Price: low to high',
    'price-desc': 'Price: high to low',
    az: 'Name: A–Z',
    za: 'Name: Z–A',
  },
  filter: 'Filter',
  filterTitle: 'Filter',
  closeFilter: 'Close filter',
  availability: 'Availability',
  inStockOnly: 'In stock only',
  inStockChip: 'In stock',
  category: 'Category',
  price: 'Price',
  clearAll: 'Clear all',
  clear: 'Clear',
  remove: 'remove',
  showResults: (n: number) => `Show ${n} product${n === 1 ? '' : 's'}`,
  noResults: 'No products match your filters.',
  clearFilters: 'Clear filters',
  addToCart: 'Add to cart',
  buyShort: 'Add',
  soldOut: 'Sold out',
  addedToCart: 'added to your cart.',
  photoPlaceholder: 'Placeholder photo',
  per: { kg: '/ kg', liter: '/ liter' },
  rating: (v: number, n: number) => `Rated ${v} out of 5, ${n} reviews`,
  wholesale: 'Need a regular supply or an export shipment?',
  wholesaleLink: 'Request a quote',
  quickLinks: 'Quick links',
  footerLinks: ['About Us', 'Shop', 'Export', 'Certification', 'Return Policy', 'Contact Us'],
  footerAbout: [
    'Placeholder paragraph about Orgafarm: who you are, where the raw materials come from, and your partner farmers.',
    'Replace with a short story about your production process and quality standards for export markets.',
  ],
  stayInTouch: 'Stay in touch',
  newsletterDesc: 'Join the Orgafarm newsletter for new products, harvest updates, and export offers.',
  email: 'Email address',
  subscribe: 'Sign up',
  subscribed: "Thanks! You're on the list.",
  waGreeting: 'Hello Orgafarm, I have a question about your products.',
};

export const DICTIONARIES: Record<Locale, Dictionary> = { id, en };
