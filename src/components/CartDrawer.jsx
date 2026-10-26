import { X, ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react'
import { useStore } from '../context/store'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, clearCart } = useStore()
  const total = useStore((s) => s.cartTotal())

  if (!cartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-[110] w-full max-w-md glass-heavy border-l border-white/10
                      flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-electric-light" />
            <h2 className="font-display text-xl text-white">Your Bag</h2>
            {cart.length > 0 && (
              <span className="tag-electric text-xs">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
            )}
          </div>
          <button onClick={() => setCartOpen(false)} className="btn-icon">
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-800/40 flex items-center justify-center">
                <ShoppingBag size={32} className="text-muted" />
              </div>
              <div>
                <p className="text-white font-medium mb-1">Your bag is empty</p>
                <p className="text-muted text-sm">Add some pieces you love</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.key} className="flex gap-4 card p-3">
                <Link
                  to={`/product/${item.id}`}
                  onClick={() => setCartOpen(false)}
                  className="flex-shrink-0 w-20 h-24 overflow-hidden rounded-xl"
                >
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-electric-light font-medium mb-0.5">{item.brand}</p>
                      <h4 className="text-sm text-white font-medium leading-tight">{item.name}</h4>
                    </div>
                    <button onClick={() => removeFromCart(item.key)} className="text-muted hover:text-red-400 transition-colors flex-shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="tag-muted text-xs">{item.size}</span>
                    <div
                      className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-sm font-medium">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="price-tag text-sm">${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            {/* Promo Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code"
                className="input-field text-sm py-2.5 rounded-xl"
              />
              <button className="btn-secondary text-sm py-2.5 px-4 whitespace-nowrap rounded-xl">Apply</button>
            </div>
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-muted text-sm">Subtotal</span>
              <span className="price-tag">${total.toLocaleString()}</span>
            </div>
            <p className="text-muted text-xs">Shipping and taxes calculated at checkout</p>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="btn-primary w-full rounded-xl py-4 text-base"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>
            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-muted hover:text-red-400 transition-colors py-1"
            >
              Clear bag
            </button>
          </div>
        )}
      </div>
    </>
  )
}
