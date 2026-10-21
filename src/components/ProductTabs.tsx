'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useI18n } from '@/components/LocaleProvider';
import { CONTENT } from '@/lib/content';
import { PRODUCTS, type Product } from '@/lib/catalog';
import { pagePath } from '@/lib/site';

type TabId = 'featured' | 'coconut' | 'other';

const TAB_FILTERS: Record<TabId, (p: Product) => boolean> = {
  featured: (p) => p.featured <= 5,
  coconut: (p) => p.category === 'gula' || p.category === 'minyak',
  other: (p) => p.category !== 'gula' && p.category !== 'minyak',
};

/** Section "Jelajahi produk" di home: tab + baris produk yang bisa digeser. */
export default function ProductTabs() {
  const { lang } = useI18n();
  const c = CONTENT[lang].home;
  const [tab, setTab] = useState<TabId>('featured');
  const rowRef = useRef<HTMLDivElement>(null);

  const products = PRODUCTS.filter(TAB_FILTERS[tab]).sort((a, b) => a.featured - b.featured);

  function scroll(dir: 1 | -1) {
    const row = rowRef.current;
    if (row) row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: 'smooth' });
  }

  return (
    <div>
      <div role="tablist" aria-label={c.exploreTitle} className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {(Object.keys(TAB_FILTERS) as TabId[]).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => {
              setTab(id);
              rowRef.current?.scrollTo({ left: 0 });
            }}
            className={`rounded-sm px-4 py-2 text-sm font-medium transition sm:min-w-44 ${
              tab === id ? 'bg-brand text-white' : 'border border-line text-brand hover:border-brand'
            }`}
          >
            {c.tabs[id]}
          </button>
        ))}
      </div>

      <div className="relative mt-10">
        <div
          ref={rowRef}
          className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:gap-6 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {products.map((p) => (
            <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        {products.length > 2 && (
          <>
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label={c.prev}
              className="absolute -left-3 top-[28%] hidden size-10 place-items-center rounded-full border border-line bg-white text-brand shadow-sm hover:border-brand sm:grid lg:-left-5"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label={c.next}
              className="absolute -right-3 top-[28%] hidden size-10 place-items-center rounded-full border border-line bg-white text-brand shadow-sm hover:border-brand sm:grid lg:-right-5"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={pagePath(lang, 'shop')}
          className="inline-block rounded-sm border border-brand px-6 py-2.5 text-sm font-medium text-brand transition hover:bg-brand hover:text-white"
        >
          {c.viewAll}
        </Link>
      </div>
    </div>
  );
}
