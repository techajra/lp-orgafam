import { Sprout } from 'lucide-react';

// PLACEHOLDER: logo sementara (ikon + teks). Ganti dengan file logo Orgafarm, mis.
// <Image src="/orgafarm-logo.svg" ... />, setelah aset brand tersedia.
export default function Logo({ light = false, sub = 'organik' }: { light?: boolean; sub?: string }) {
  return (
    <span className="inline-flex items-center gap-2" aria-label="Orgafarm">
      <span
        className={`grid size-10 place-items-center rounded-full ${light ? 'bg-white/15 text-sun' : 'bg-sun/20 text-brand'}`}
      >
        <Sprout className="size-6" strokeWidth={2.2} />
      </span>
      <span className="leading-none">
        <span className={`block font-heading text-2xl font-bold tracking-tight ${light ? 'text-white' : 'text-brand'}`}>
          orgafarm
        </span>
        <span className={`block text-[10px] font-medium uppercase tracking-[0.25em] ${light ? 'text-sky' : 'text-ink'}`}>
          {sub}
        </span>
      </span>
    </span>
  );
}
