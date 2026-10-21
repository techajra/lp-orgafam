// ─── PLACEHOLDER — kontak & tautan situs, ganti setelah profil Orgafarm final ───
// Teks yang diterjemahkan ada di src/lib/i18n.ts.

export const SITE = {
  name: 'Orgafarm',
  // Nomor WhatsApp toko (format internasional, tanpa "+").
  waNumber: '6280000000000',
  email: 'halo@orgafarm.example',
  address: 'Alamat kebun / gudang Orgafarm (placeholder)',
};

/** Halaman di menu utama, urutannya sama dengan `nav` di kamus i18n. */
export const NAV_SLUGS = ['shop', 'about', 'export', 'certification', 'contact'] as const;

/** Tujuan tautan footer (slug halaman, atau null kalau belum ada), urutannya sama dengan `footerLinks`. */
export const FOOTER_SLUGS = ['about', 'shop', 'export', 'certification', null, 'contact'] as const;

export function pagePath(lang: string, slug?: string | null) {
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

export function waLink(text: string) {
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(text)}`;
}
