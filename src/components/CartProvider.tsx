'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// Keranjang sederhana di memori browser — cukup untuk demo tata letak.
// Sambungkan ke checkout/WhatsApp bot sungguhan saat alur pemesanan sudah jelas.
type CartContextValue = {
  count: number;
  lastAdded: string | null;
  add: (productName: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const add = useCallback((productName: string) => {
    setCount((c) => c + 1);
    setLastAdded(productName);
  }, []);

  const value = useMemo(() => ({ count, lastAdded, add }), [count, lastAdded, add]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart harus dipakai di dalam <CartProvider>');
  return ctx;
}
