import { Mail, MessageCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import NewsletterForm from '@/components/NewsletterForm';
import { FOOTER_ABOUT, FOOTER_LINKS, SITE, waLink } from '@/lib/site';

export default function Footer() {
  return (
    <footer>
      {/* Strip info di atas footer */}
      <div className="border-t border-line bg-sky-soft">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-ink sm:px-6">
          {/* PLACEHOLDER: kalimat promosi / info tambahan */}
          Mau beli dalam jumlah besar untuk toko atau usaha kuliner?{' '}
          <a href="#" className="font-medium text-brand underline underline-offset-2">
            Lihat program grosir
          </a>
          .
        </p>
      </div>

      <div className="bg-brand text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 text-center sm:px-6 md:grid-cols-3 md:text-left">
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest">{SITE.tagline}</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/85">
              {FOOTER_ABOUT.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="md:justify-self-center">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest">Tautan cepat</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 md:grid-cols-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="block py-1.5 text-sm uppercase tracking-wide text-white/85 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest">Tetap terhubung</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/85">
              Daftar newsletter {SITE.name} untuk info produk baru, resep, dan promo khusus pelanggan.
            </p>
            <NewsletterForm />
            <div className="mt-6 flex justify-center gap-3 md:justify-start">
              <a
                href={waLink(`Halo ${SITE.name}, saya mau tanya produk.`)}
                className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="WhatsApp"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-xs text-white/70 sm:px-6 md:flex-row md:justify-between">
            <Logo light />
            <p className="text-center md:text-right">
              © {new Date().getFullYear()} {SITE.name}. {SITE.address}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
