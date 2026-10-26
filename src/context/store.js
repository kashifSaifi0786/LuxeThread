import { create } from 'zustand'

export const useStore = create((set, get) => ({
  // --- Cart ---
  cart: [],
  addToCart: (product, size, color) => set((state) => {
    const key = `${product.id}-${size}-${color}`
    const existing = state.cart.find(i => i.key === key)
    if (existing) {
      return { cart: state.cart.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i) }
    }
    return { cart: [...state.cart, { ...product, key, size, color, qty: 1 }] }
  }),
  removeFromCart: (key) => set((state) => ({ cart: state.cart.filter(i => i.key !== key) })),
  updateQty: (key, qty) => set((state) => ({
    cart: qty < 1
      ? state.cart.filter(i => i.key !== key)
      : state.cart.map(i => i.key === key ? { ...i, qty } : i)
  })),
  clearCart: () => set({ cart: [] }),
  cartTotal: () => get().cart.reduce((sum, i) => sum + i.price * i.qty, 0),
  cartCount: () => get().cart.reduce((sum, i) => sum + i.qty, 0),

  // --- Cart Drawer ---
  cartOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),

  // --- Quick View ---
  quickViewProduct: null,
  setQuickView: (p) => set({ quickViewProduct: p }),

  // --- Filters ---
  filters: {
    category: 'All',
    brands: [],
    priceRange: [0, 1000],
    sort: 'featured',
    search: '',
  },
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: { category: 'All', brands: [], priceRange: [0, 1000], sort: 'featured', search: '' } }),

  // --- Wishlist ---
  wishlist: [],
  toggleWishlist: (id) => set((state) => ({
    wishlist: state.wishlist.includes(id) ? state.wishlist.filter(i => i !== id) : [...state.wishlist, id]
  })),
  isWishlisted: (id) => get().wishlist.includes(id),

  // --- Toast ---
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Date.now()
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }))
    setTimeout(() => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })), 3200)
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })),
}))
