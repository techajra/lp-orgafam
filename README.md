# Orgafarm Web

Halaman katalog produk Orgafarm (Next.js 16, Tailwind v4). Tata letak mengacu pada pola
halaman koleksi toko online: bar promo + header, banner koleksi, filter & urutkan, grid
kartu produk, dan footer navy tiga kolom.

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
| Nomor WA, email, alamat, tujuan tautan | `src/lib/site.ts` |
| Logo (sementara ikon + teks) | `src/components/Logo.tsx` |
| Latar banner koleksi | `src/app/[lang]/page.tsx` |

Rating bintang hanya tampil kalau field `rating` diisi — isi dengan ulasan sungguhan saja.
Keranjang dan newsletter masih demo di sisi browser (belum tersambung ke checkout/email).
