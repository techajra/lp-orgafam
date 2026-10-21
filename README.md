# Orgafarm Web

Situs Orgafarm (Next.js 16, Tailwind v4), dua bahasa. Tata letak mengacu pada pola toko
online: bar promo + header, banner, filter & urutkan, grid kartu produk, footer navy tiga kolom.

| Halaman | Rute |
| --- | --- |
| Home (kolase, hero, tab produk, kartu cerita, CTA) | `/id`, `/en` |
| Belanja / katalog | `/[lang]/shop` |
| Tentang | `/[lang]/about` |
| Ekspor (alur, tabel produk, form penawaran) | `/[lang]/export` |
| Sertifikasi | `/[lang]/certification` |
| Kontak (info + form) | `/[lang]/contact` |

Form penawaran & kontak belum punya backend: isinya disusun jadi pesan WhatsApp ke
nomor toko (`waNumber` di `src/lib/site.ts`).

```bash
npm install
npm run dev   # atau dari folder ajra: launch "orgafarm" (port 3040)
```

## Dua bahasa

Rute `/id` (Rupiah) dan `/en` (USD). Halaman `/` diarahkan otomatis oleh `src/proxy.ts`:
ke `/id` kalau bahasa browser Indonesia, selain itu ke `/en`. Semua teks antarmuka ada di
`src/lib/i18n.ts`; kurs USD tetap diatur lewat `USD_RATE` di file yang sama.

## Data & konten yang perlu dilengkapi

Konten contoh ditandai komentar `PLACEHOLDER` di kode.

| Apa | Di mana |
| --- | --- |
| Produk, harga jual (Rupiah), satuan, kategori, label | `src/lib/catalog.ts` |
| Foto produk (isi field `image`, file di `public/products/`) | `src/lib/catalog.ts` |
| Teks antarmuka ID/EN, promo bar, deskripsi, footer | `src/lib/i18n.ts` |
| Isi halaman home, tentang, ekspor, sertifikasi, kontak | `src/lib/content.ts` |
| Nomor WA, email, alamat, tujuan tautan | `src/lib/site.ts` |
| Logo (sementara ikon + teks) | `src/components/Logo.tsx` |
| Kolase foto home | `src/app/[lang]/page.tsx` |
| Latar banner halaman dalam | `src/components/PageBanner.tsx` |
| Ikon tab browser | `src/app/icon.svg` |

Rating bintang hanya tampil kalau field `rating` diisi — isi dengan ulasan sungguhan saja.
Keranjang dan newsletter masih demo di sisi browser (belum tersambung ke checkout/email).
