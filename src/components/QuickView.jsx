import { useState } from 'react'
import { X, Star, Heart, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '../context/store'
import { Link } from 'react-router-dom'

export default function QuickView() {
  const { quickViewProduct: product, setQuickView, addToCart, toggleWishlist, addToast, setCartOpen } = useStore()
  const wishlisted = useStore((s) => product ? s.isWishlisted(product.id) : false)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(0)
  const [imgIdx, setImgIdx] = useState(0)
  const [sizeError, setSizeError] = useState(false)

  if (!product) return null

  const handleAdd = () => {
    if (!selectedSize) { setSizeError(true); return }
    addToCart(product, selectedSize, product.colors[selectedColor])
    addToast(`${product.name} added to bag`, 'success')
    setQuickView(null)
    setTimeout(() => setCartOpen(true), 200)
  }

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md animate-fade-in" onClick={() => setQuickView(null)} />
      <div className="fixed inset-4 md:inset-12 lg:inset-16 z-[95] glass-heavy rounded-3xl border border-white/10
                      overflow-auto animate-scale-in flex flex-col lg:flex-row max-h-[90vh]">
        {/* Close */}
        <button
          onClick={() => setQuickView(null)}
          className="absolute top-4 right-4 z-10 btn-icon"
        >
          <X size={16} />
        </button>

        {/* Image */}
        <div className="relative lg:w-1/2 flex-shrink-0 bg-indigo-900/30 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none overflow-hidden min-h-64">
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.images.length > 1 && (
            <>
              <button onClick={() => setImgIdx(p => (p - 1 + product.images.length) % product.images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 btn-icon bg-black/40">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setImgIdx(p => (p + 1) % product.images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 btn-icon bg-black/40">
                <ChevronRight size={16} />
              </button>
            </>
          )}
          {product.badge && (
            <div className="absolute top-4 left-4 tag-electric text-xs">{product.badge}</div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-10 flex flex-col gap-5 overflow-y-auto">
          <div>
            <p className="section-label mb-1">{product.brand}</p>
            <h2 className="font-display text-2xl lg:text-3xl text-white mb-2">{product.name}</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted'} />
                ))}
                <span className="text-xs text-muted ml-1">{product.rating} ({product.reviews})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="price-tag text-2xl">${product.price}</span>
            {product.originalPrice && <span className="price-original">${product.originalPrice}</span>}
            {product.originalPrice && (
              <span className="tag bg-green-500/15 text-green-400 border border-green-500/20 text-xs">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          <p className="text-muted text-sm leading-relaxed">{product.description}</p>

          {/* Colors */}
          <div>
            <p className="text-xs text-muted mb-2 uppercase tracking-wider">Colour — <span className="text-white">{product.colorNames[selectedColor]}</span></p>
            <div className="flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === i ? 'border-electric scale-110' : 'border-transparent hover:border-white/30'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className={`text-xs mb-2 uppercase tracking-wider ${sizeError ? 'text-red-400' : 'text-muted'}`}>
              {sizeError ? 'Please select a size' : 'Size'}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSelectedSize(s); setSizeError(false) }}
                  className={`px-4 py-2 text-sm rounded-xl border transition-all duration-200
                    ${selectedSize === s
                      ? 'border-electric bg-electric/15 text-white'
                      : 'border-white/10 text-muted hover:border-white/30 hover:text-white'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted">Material: {product.materials}</p>

          {/* Actions */}
          <div className="flex gap-3 mt-auto">
            <button onClick={handleAdd} className="btn-primary flex-1 py-4 rounded-xl text-base">
              <ShoppingBag size={18} />
              Add to Bag
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`btn-icon w-14 h-14 rounded-xl border ${wishlisted ? 'border-red-400 text-red-400 bg-red-400/10' : ''}`}
            >
              <Heart size={18} className={wishlisted ? 'fill-red-400' : ''} />
            </button>
          </div>
          <Link
            to={`/product/${product.id}`}
            onClick={() => setQuickView(null)}
            className="text-center text-sm text-electric-light hover:text-white transition-colors"
          >
            View full details →
          </Link>
        </div>
      </div>
    </>
  )
}
