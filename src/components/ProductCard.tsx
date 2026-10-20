'use client';

import { Star } from 'lucide-react';
import ProductImage from '@/components/ProductImage';
import { useCart } from '@/components/CartProvider';
import { formatRupiah, type Product } from '@/lib/catalog';

function Rating({ value, count }: { value: number; count: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5" aria-label={`Rating ${value} dari 5, ${count} ulasan`}>
      <span className="relative inline-flex" aria-hidden>
        <span className="flex text-line">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
        </span>
        <span className="absolute inset-y-0 left-0 flex overflow-hidden text-sun" style={{ width: `${(value / 5) * 100}%` }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-3.5 shrink-0 fill-current" />
          ))}
        </span>
      </span>
      <span className="text-xs text-ink">({count})</span>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group flex flex-col text-center">
      <a href="#" className="relative block aspect-square overflow-hidden rounded-md bg-white" aria-label={product.name}>
        <ProductImage product={product} />
        {product.badge && (
          <span
            className={`absolute left-2 top-2 rounded-sm px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
              product.badge === 'Hemat' ? 'bg-sun text-brand-dark' : 'bg-brand text-white'
            }`}
          >
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute right-2 top-2 rounded-sm bg-white/90 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink">
            Stok habis
          </span>
        )}
      </a>

      <div className="mt-3 flex flex-1 flex-col border-t border-line pt-3">
        <h3 className="font-heading text-base font-medium leading-snug text-brand sm:text-[17px]">
          <a href="#" className="hover:underline">
            {product.name}
          </a>
        </h3>
        <div className="mt-2">
          <Rating value={product.rating} count={product.reviews} />
        </div>
        <div className="mt-auto pt-3">
          {product.hasVariants && <p className="text-xs text-ink">Mulai dari</p>}
          <p className="font-heading text-[15px] font-medium text-brand">
            {product.compareAtPrice && (
              <s className="mr-1.5 text-sm font-normal text-ink/70">{formatRupiah(product.compareAtPrice)}</s>
            )}
            {formatRupiah(product.price)}
          </p>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => add(product.name)}
            className="mt-3 w-full rounded-sm bg-brand px-3 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-ink lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100 lg:disabled:opacity-100"
          >
            {product.inStock ? (
              <>
                <span className="sm:hidden">Beli</span>
                <span className="hidden sm:inline">Tambah ke keranjang</span>
              </>
            ) : (
              'Stok habis'
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
