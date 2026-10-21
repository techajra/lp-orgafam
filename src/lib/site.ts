// ─── PLACEHOLDER — kontak & tautan situs, ganti setelah profil Orgafarm final ───
// Teks yang diterjemahkan ada di src/lib/i18n.ts.

export const SITE = {
  name: 'Orgafarm',
  // Nomor WhatsApp toko (format internasional, tanpa "+").
  waNumber: '6280000000000',
  email: 'halo@orgafarm.example',
  address: 'Alamat kebun / gudang Orgafarm (placeholder)',
};

/** Tujuan menu utama, urutannya sama dengan `nav` di kamus i18n. */
export const NAV_HREFS = ['#katalog', '#', '#', '#', '#'];

/** Tujuan tautan footer, urutannya sama dengan `footerLinks` di kamus i18n. */
export const FOOTER_HREFS = ['#', '#katalog', '#', '#', '#', '#'];

export function waLink(text: string) {
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(text)}`;
}
