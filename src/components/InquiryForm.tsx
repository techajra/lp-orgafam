'use client';

import { useI18n } from '@/components/LocaleProvider';
import { CONTENT } from '@/lib/content';
import { PRODUCTS } from '@/lib/catalog';
import { waLink } from '@/lib/site';

/**
 * Form permintaan penawaran / pesan. Belum ada backend: saat dikirim, isi form disusun
 * jadi pesan WhatsApp ke nomor toko dan dibuka di tab baru.
 */
export default function InquiryForm({ variant }: { variant: 'export' | 'contact' }) {
  const { lang } = useI18n();
  const f = CONTENT[lang].form;
  const isExport = variant === 'export';

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      isExport ? CONTENT[lang].export.formTitle : CONTENT[lang].contact.formTitle,
      ...[
        [f.name, data.get('name')],
        [f.company, data.get('company')],
        [f.country, data.get('country')],
        [f.email, data.get('email')],
        [f.product, data.get('product')],
        [f.volume, data.get('volume')],
        [f.message, data.get('message')],
      ]
        .filter(([, v]) => typeof v === 'string' && v.trim())
        .map(([k, v]) => `${k}: ${v}`),
    ];
    window.open(waLink(lines.join('\n')), '_blank', 'noopener');
  }

  const input =
    'h-11 w-full rounded-sm border border-line bg-white px-3 text-sm text-ink placeholder:text-ink/50 focus:border-brand focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-1.5 text-sm font-medium text-brand">
        {f.name}
        <input name="name" required autoComplete="name" className={input} />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-brand">
        {f.email}
        <input name="email" type="email" required autoComplete="email" className={input} />
      </label>
      {isExport && (
        <>
          <label className="grid gap-1.5 text-sm font-medium text-brand">
            {f.company}
            <input name="company" autoComplete="organization" className={input} />
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-brand">
            {f.country}
            <input name="country" required autoComplete="country-name" className={input} />
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-brand">
            {f.product}
            <select name="product" className={input}>
              {PRODUCTS.map((p) => (
                <option key={p.id}>{p.name[lang]}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-brand">
            {f.volume}
            <input name="volume" placeholder={f.volumeHint} className={input} />
          </label>
        </>
      )}
      <label className="grid gap-1.5 text-sm font-medium text-brand sm:col-span-2">
        {f.message}
        <textarea name="message" rows={4} required={!isExport} className={`${input} h-auto py-2.5`} />
      </label>
      <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-center sm:gap-4">
        <button type="submit" className="rounded-sm bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand-dark">
          {f.send}
        </button>
        <p className="text-xs text-ink">{f.hint}</p>
      </div>
    </form>
  );
}
