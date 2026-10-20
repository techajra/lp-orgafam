// ─── PLACEHOLDER — teks & tautan situs, ganti setelah profil Orgafarm final ───

export const SITE = {
  name: 'Orgafarm',
  tagline: 'Tanam baik. Makan baik. Hidup baik.',
  announcement: 'Gratis ongkir untuk belanja di atas Rp150.000',
  // Nomor WhatsApp toko (format internasional, tanpa "+").
  waNumber: '6280000000000',
  email: 'halo@orgafarm.example',
  address: 'Alamat kebun / gudang Orgafarm (placeholder)',
};

export const NAV_LINKS = [
  { label: 'Belanja', href: '#katalog' },
  { label: 'Tentang', href: '#' },
  { label: 'Resep', href: '#' },
  { label: 'Lokasi Toko', href: '#' },
  { label: 'Grosir', href: '#' },
];

export const FOOTER_LINKS = [
  { label: 'Cari', href: '#' },
  { label: 'Tentang Kami', href: '#' },
  { label: 'Belanja', href: '#katalog' },
  { label: 'Resep', href: '#' },
  { label: 'Lokasi Toko', href: '#' },
  { label: 'Kebijakan Pengembalian', href: '#' },
  { label: 'Ulasan', href: '#' },
  { label: 'Hubungi Kami', href: '#' },
];

export const FOOTER_ABOUT = [
  'Paragraf placeholder tentang Orgafarm: siapa kalian, sejak kapan bertani, dan apa yang membuat produknya berbeda.',
  'Ganti dengan cerita singkat tentang kebun, petani mitra, dan cara produk diolah tanpa bahan kimia sintetis.',
];

export function waLink(text: string) {
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(text)}`;
}
