import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('hubmall_cart') || '[]'),

  addItem: (product) => {
    const { items } = get();
    const existing = items.find((i) => i.id === product.id);

    let updated;
    if (existing) {
      updated = items.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updated = [...items, { ...product, quantity: 1 }];
    }

    localStorage.setItem('hubmall_cart', JSON.stringify(updated));
    set({ items: updated });
  },

  removeItem: (id) => {
    const updated = get().items.filter((i) => i.id !== id);
    localStorage.setItem('hubmall_cart', JSON.stringify(updated));
    set({ items: updated });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    const updated = get().items.map((i) =>
      i.id === id ? { ...i, quantity } : i
    );
    localStorage.setItem('hubmall_cart', JSON.stringify(updated));
    set({ items: updated });
  },

  clearCart: () => {
    localStorage.removeItem('hubmall_cart');
    set({ items: [] });
  },

  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}));
