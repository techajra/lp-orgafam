import type { LucideIcon } from 'lucide-react';

/**
 * Pengganti foto selama aset asli belum ada. Ganti pemakaiannya dengan <Image> dari next/image
 * begitu foto tersedia; `label` menjelaskan foto apa yang sebaiknya dipasang di situ.
 */
export default function PlaceholderVisual({
  icon: Icon,
  label,
  tint = 'from-[#eaf7ff] to-[#c0e9ff]',
  className = '',
}: {
  icon: LucideIcon;
  label: string;
  tint?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-linear-to-br p-4 text-center ${tint} ${className}`}
      role="img"
      aria-label={label}
    >
      <Icon className="size-10 text-brand/40 sm:size-12" strokeWidth={1.5} aria-hidden />
      <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand/70">
        {label}
      </span>
    </div>
  );
}
