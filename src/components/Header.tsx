'use client';

import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { useCart } from '@/components/CartProvider';
import { NAV_LINKS, SITE } from '@/lib/site';

function CartButton({ className = '' }: { className?: string }) {
  const { count } = useCart();
  return (
    <a href="#" className={`relative inline-flex items-center gap-1.5 ${className}`} aria-label={`Keranjang, ${count} barang`}>
      <ShoppingBag className="size-5" />
      <span className="text-sm">{count}</span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* Bar atas: info promo kiri, pencarian + keranjang + akun kanan */}
      <div className="bg-brand text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-4 px-4 sm:justify-between sm:px-6">
          <p className="truncate text-xs font-medium">{SITE.announcement}</p>
          <div className="hidden items-center gap-4 sm:flex">
            <form role="search" className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="search"
                placeholder="Cari produk..."
                aria-label="Cari produk"
                className="h-7 w-56 rounded-sm bg-white pl-2.5 pr-8 text-sm text-ink placeholder:text-ink/60 focus:outline-2 focus:outline-sky lg:w-80"
              />
              <Search className="pointer-events-none absolute right-2 top-1.5 size-4 text-ink" />
            </form>
            <CartButton />
            <span className="h-4 w-px bg-white/40" aria-hidden />
            <a href="#" aria-label="Akun">
              <User className="size-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bar utama: logo kiri, navigasi tengah */}
      <div className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-24">
          <button
            type="button"
            className="-ml-2 p-2 text-brand lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
          >
            <Menu className="size-6" />
          </button>
          <a href="#" className="mx-auto lg:mx-0">
            <Logo />
          </a>
          <nav className="hidden flex-1 justify-center lg:flex" aria-label="Navigasi utama">
            <ul className="flex gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="py-2 text-[15px] uppercase tracking-wide text-ink transition hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* Penyeimbang lebar logo supaya nav tetap di tengah */}
          <div className="hidden w-[170px] lg:block" aria-hidden />
          <CartButton className="-mr-1 p-1 text-brand sm:hidden" />
        </div>
      </div>

      {/* Laci menu mobile */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`}
        inert={!open}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-80 max-w-[85%] flex-col bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}
          role="dialog"
          aria-label="Menu"
        >
          <div className="flex items-center justify-between border-b border-line p-4">
            <Logo />
            <button type="button" className="p-2 text-brand" onClick={() => setOpen(false)} aria-label="Tutup menu">
              <X className="size-6" />
            </button>
          </div>
          <form role="search" className="relative border-b border-line p-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              placeholder="Cari produk..."
              aria-label="Cari produk"
              className="h-10 w-full rounded-sm border border-line pl-3 pr-9 text-sm focus:outline-2 focus:outline-sky"
            />
            <Search className="pointer-events-none absolute right-7 top-7 size-4 text-ink" />
          </form>
          <nav aria-label="Navigasi mobile" className="flex-1 overflow-y-auto">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.label} className="border-b border-line">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3.5 text-sm uppercase tracking-wide text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#" className="flex items-center gap-2 border-t border-line px-5 py-4 text-sm text-brand">
            <User className="size-5" /> Masuk / Daftar
          </a>
        </div>
      </div>
    </header>
  );
}
