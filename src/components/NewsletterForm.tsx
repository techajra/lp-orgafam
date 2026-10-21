'use client';

import { useState } from 'react';
import { useI18n } from '@/components/LocaleProvider';

// Belum tersambung ke layanan email apa pun — hanya menampilkan konfirmasi di halaman.
export default function NewsletterForm() {
  const [sent, setSent] = useState(false);
  const { t } = useI18n();

  if (sent) {
    return <p className="mt-4 rounded-sm bg-white/10 px-3 py-2.5 text-sm">{t.subscribed}</p>;
  }

  return (
    <form
      className="mt-4 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input
        type="email"
        required
        placeholder={t.email}
        aria-label={t.email}
        className="h-10 min-w-0 flex-1 rounded-sm bg-white px-3 text-sm text-ink placeholder:text-ink/60 focus:outline-2 focus:outline-sky"
      />
      <button type="submit" className="h-10 rounded-sm bg-sky px-4 text-sm font-medium text-brand hover:bg-white">
        {t.subscribe}
      </button>
    </form>
  );
}
