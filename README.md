# Orgafarm Web

Halaman katalog produk Orgafarm (Next.js 16, Tailwind v4). Tata letak mengacu pada pola
halaman koleksi toko online: bar promo + header, banner koleksi, filter & urutkan, grid
kartu produk, dan footer navy tiga kolom.

```bash
npm install
npm run dev   # atau dari folder ajra: launch "orgafarm" (port 3040)
```

## Konten placeholder yang perlu diganti

Semua ditandai komentar `PLACEHOLDER` di kode.

| Apa | Di mana |
| --- | --- |
| Daftar produk, harga, rating, stok, kategori | `src/lib/catalog.ts` |
| Foto produk (isi field `image`, file di `public/products/`) | `src/lib/catalog.ts` |
| Nama, tagline, promo, nomor WA, email, alamat, tautan | `src/lib/site.ts` |
| Logo (sementara ikon + teks) | `src/components/Logo.tsx` |
| Banner & deskripsi koleksi | `src/app/page.tsx` |
| Judul & deskripsi SEO | `src/app/layout.tsx` |
| Strip info grosir di atas footer | `src/components/Footer.tsx` |

Keranjang dan newsletter masih demo di sisi browser (belum tersambung ke checkout/email).
