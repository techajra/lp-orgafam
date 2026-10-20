import Image from 'next/image';
import { Apple, Droplet, Flower2, Leaf, Wheat, type LucideIcon } from 'lucide-react';
import type { CategoryId, Product } from '@/lib/catalog';

const ICONS: Record<CategoryId, LucideIcon> = {
  minyak: Droplet,
  biji: Leaf,
  tepung: Wheat,
  beras: Wheat,
  pemanis: Flower2,
  rempah: Apple,
};

const TINTS: Record<CategoryId, string> = {
  minyak: 'from-[#fff6dc] to-[#fde7a8]',
  biji: 'from-[#eef7e6] to-[#d5ebc2]',
  tepung: 'from-[#f8f3ea] to-[#ecdfc8]',
  beras: 'from-[#f6ece8] to-[#e6cfc6]',
  pemanis: 'from-[#fff1e0] to-[#f8d6a8]',
  rempah: 'from-[#fff3e2] to-[#f6cf9a]',
};

/** Foto produk; selama `product.image` kosong menampilkan placeholder bertanda jelas. */
export default function ProductImage({ product }: { product: Product }) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
        className="object-contain p-4 transition duration-300 group-hover:scale-105"
      />
    );
  }

  const Icon = ICONS[product.category];
  return (
    <div
      className={`absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-lg bg-linear-to-br ${TINTS[product.category]} transition duration-300 group-hover:scale-[1.03]`}
    >
      <Icon className="size-12 text-brand/45" strokeWidth={1.5} aria-hidden />
      <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand/70">
        Foto placeholder
      </span>
    </div>
  );
}
