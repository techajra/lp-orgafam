'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/components/CartProvider';
import {
  CATEGORIES,
  PRICE_RANGES,
  PRODUCTS,
  SORT_OPTIONS,
  type CategoryId,
  type Product,
  type SortId,
} from '@/lib/catalog';

type PriceRangeId = (typeof PRICE_RANGES)[number]['id'];

type Filters = {
  categories: CategoryId[];
  prices: PriceRangeId[];
  inStockOnly: boolean;
};

const EMPTY_FILTERS: Filters = { categories: [], prices: [], inStockOnly: false };

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function applyFilters(products: Product[], f: Filters) {
  return products.filter((p) => {
    if (f.categories.length && !f.categories.includes(p.category)) return false;
    if (f.inStockOnly && !p.inStock) return false;
    if (f.prices.length) {
      const ok = PRICE_RANGES.some((r) => f.prices.includes(r.id) && p.price >= r.min && p.price <= r.max);
      if (!ok) return false;
    }
    return true;
  });
}

function applySort(products: Product[], sort: SortId) {
  const list = [...products];
  switch (sort) {
    case 'best':
      return list.sort((a, b) => b.reviews - a.reviews);
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'az':
      return list.sort((a, b) => a.name.localeCompare(b.name, 'id'));
    case 'za':
      return list.sort((a, b) => b.name.localeCompare(a.name, 'id'));
    case 'newest':
      return list.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    default:
      return list.sort((a, b) => a.featured - b.featured);
  }
}

function CheckOption({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-ink hover:text-brand">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="grid size-4 shrink-0 place-items-center rounded-[3px] border border-ink/40 text-white peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sky">
        {checked && <Check className="size-3" strokeWidth={3} />}
      </span>
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-ink/70">({count})</span>}
    </label>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details open className="group border-b border-line py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-[15px] font-medium uppercase tracking-wide text-brand [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-4 transition group-open:rotate-180" />
      </summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

function FilterPanel({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }) {
  return (
    <div>
      <FilterGroup title="Ketersediaan">
        <CheckOption
          checked={filters.inStockOnly}
          onChange={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}
          label="Hanya yang tersedia"
          count={PRODUCTS.filter((p) => p.inStock).length}
        />
      </FilterGroup>
      <FilterGroup title="Kategori">
        {CATEGORIES.map((c) => (
          <CheckOption
            key={c.id}
            checked={filters.categories.includes(c.id)}
            onChange={() => setFilters({ ...filters, categories: toggle(filters.categories, c.id) })}
            label={c.label}
            count={PRODUCTS.filter((p) => p.category === c.id).length}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Harga">
        {PRICE_RANGES.map((r) => (
          <CheckOption
            key={r.id}
            checked={filters.prices.includes(r.id)}
            onChange={() => setFilters({ ...filters, prices: toggle(filters.prices, r.id) })}
            label={r.label}
          />
        ))}
      </FilterGroup>
    </div>
  );
}

function ActiveChips({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }) {
  const chips: { key: string; label: string; remove: () => void }[] = [
    ...(filters.inStockOnly
      ? [{ key: 'stock', label: 'Tersedia', remove: () => setFilters({ ...filters, inStockOnly: false }) }]
      : []),
    ...filters.categories.map((id) => ({
      key: id,
      label: CATEGORIES.find((c) => c.id === id)!.label,
      remove: () => setFilters({ ...filters, categories: toggle(filters.categories, id) }),
    })),
    ...filters.prices.map((id) => ({
      key: id,
      label: PRICE_RANGES.find((r) => r.id === id)!.label,
      remove: () => setFilters({ ...filters, prices: toggle(filters.prices, id) }),
    })),
  ];
  if (!chips.length) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.remove}
          className="inline-flex items-center gap-1.5 rounded-full bg-sky-soft px-3 py-1 text-xs font-medium text-brand hover:bg-sky"
        >
          {chip.label}
          <X className="size-3.5" aria-label="hapus" />
        </button>
      ))}
      <button
        type="button"
        onClick={() => setFilters(EMPTY_FILTERS)}
        className="text-xs font-medium text-ink underline underline-offset-2 hover:text-brand"
      >
        Hapus semua
      </button>
    </div>
  );
}

function AddedToast() {
  const { count, lastAdded } = useCart();
  if (!count || !lastAdded) return null;

  // `key` berganti tiap penambahan supaya animasi muncul-lalu-hilang diputar ulang.
  return (
    <div
      key={count}
      role="status"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm animate-toast rounded-md bg-brand px-4 py-3 text-sm text-white opacity-0 shadow-lg sm:left-auto sm:right-6 sm:mx-0"
    >
      <span className="font-medium">{lastAdded}</span> ditambahkan ke keranjang.
    </div>
  );
}

export default function Catalog() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortId>('featured');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const products = useMemo(() => applySort(applyFilters(PRODUCTS, filters), sort), [filters, sort]);
  const activeCount = filters.categories.length + filters.prices.length + (filters.inStockOnly ? 1 : 0);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <section id="katalog" className="mx-auto max-w-7xl scroll-mt-32 px-4 pb-20 sm:px-6">
      {/* Toolbar: tombol filter (mobile), jumlah produk, urutkan */}
      <div className="flex items-center justify-between gap-3 border-b border-line py-4">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex h-10 items-center gap-2 rounded-sm border border-line px-3 text-sm font-medium text-brand lg:hidden"
        >
          <SlidersHorizontal className="size-4" />
          Filter{activeCount > 0 && ` (${activeCount})`}
        </button>
        <p className="hidden text-sm text-ink lg:block">{products.length} produk</p>
        <label className="flex items-center gap-2 text-sm">
          <span className="hidden text-ink sm:inline">Urutkan:</span>
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              aria-label="Urutkan produk"
              className="h-10 appearance-none rounded-sm border border-line bg-white py-2 pl-3 pr-10 text-sm font-medium text-ink focus:outline-2 focus:outline-sky"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-ink" />
          </span>
        </label>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Sidebar filter desktop */}
        <aside className="hidden lg:block" aria-label="Filter produk">
          <h2 className="font-heading text-lg font-medium text-brand">Saring</h2>
          <FilterPanel filters={filters} setFilters={setFilters} />
        </aside>

        <div>
          <ActiveChips filters={filters} setFilters={setFilters} />
          <p className="mb-4 text-sm text-ink lg:hidden">{products.length} produk</p>
          {products.length ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-md bg-sky-soft px-6 py-14 text-center">
              <p className="font-heading text-lg text-brand">Tidak ada produk yang cocok.</p>
              <button
                type="button"
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="mt-4 rounded-sm bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
              >
                Hapus filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Laci filter mobile */}
      <div className={`fixed inset-0 z-50 lg:hidden ${drawerOpen ? '' : 'pointer-events-none'}`} inert={!drawerOpen}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setDrawerOpen(false)}
        />
        <div
          role="dialog"
          aria-label="Filter produk"
          className={`absolute inset-y-0 right-0 flex w-80 max-w-[85%] flex-col bg-white shadow-xl transition-transform ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-heading text-lg font-medium text-brand">Saring</h2>
            <button type="button" onClick={() => setDrawerOpen(false)} className="p-1 text-brand" aria-label="Tutup filter">
              <X className="size-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5">
            <FilterPanel filters={filters} setFilters={setFilters} />
          </div>
          <div className="flex gap-3 border-t border-line p-4">
            <button
              type="button"
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="flex-1 rounded-sm border border-line py-2.5 text-sm font-medium text-ink"
            >
              Hapus
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="flex-1 rounded-sm bg-brand py-2.5 text-sm font-medium text-white"
            >
              Lihat {products.length} produk
            </button>
          </div>
        </div>
      </div>

      <AddedToast />
    </section>
  );
}
