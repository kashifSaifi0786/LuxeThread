import { useState } from 'react'
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/store'

export default function ProductCard({ product, index = 0 }) {
  const { toggleWishlist, isWishlisted, setQuickView, addToCart, addToast, setCartOpen } = useStore()
  const wishlisted = useStore((s) => s.isWishlisted(product.id))
  const [hovered, setHovered] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Quick add with first available size
    const size = product.sizes[0]
    addToCart(product, size, product.colors[0])
    addToast(`${product.name} added to bag`, 'success')
    setTimeout(() => setCartOpen(true), 300)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
    addToast(wishlisted ? 'Removed from wishlist' : `Saved to wishlist`, wishlisted ? 'info' : 'success')
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setQuickView(product)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div
      className="group relative animate-fade-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
      onMouseEnter={() => { setHovered(true); if (product.images[1]) setImgIdx(1) }}
      onMouseLeave={() => { setHovered(false); setImgIdx(0) }}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl bg-indigo-900/40 aspect-[3/4]">
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay actions */}
          <div className={`absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent
                            transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

          {/* Action buttons */}
          <div className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300
                            ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleQuickAdd}
              className="flex-1 btn-primary rounded-xl py-2.5 text-sm"
            >
              <ShoppingBag size={14} />
              Quick Add
            </button>
            <button onClick={handleQuickView} className="btn-icon w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm">
              <Eye size={14} />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                ${product.badge === 'Sale' ? 'bg-green-500/90 text-white' :
                  product.badge === 'New' ? 'bg-electric/90 text-white' :
                  product.badge === 'Limited' ? 'bg-orange-500/90 text-white' :
                  'bg-white/15 backdrop-blur-sm text-white border border-white/20'}`}>
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/90 text-white">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
                         transition-all duration-300 backdrop-blur-sm
                         ${wishlisted
                           ? 'bg-red-500/90 border border-red-400'
                           : 'bg-white/10 border border-white/20 opacity-0 group-hover:opacity-100'}`}
          >
            <Heart size={13} className={wishlisted ? 'fill-white text-white' : 'text-white'} />
          </button>
        </div>

        {/* Info */}
        <div className="mt-3 px-1">
          <p className="text-xs text-electric-light font-medium mb-0.5">{product.brand}</p>
          <h3 className="text-sm text-white font-medium leading-snug group-hover:text-electric-light transition-colors duration-200">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="price-tag text-sm">${product.price}</span>
              {product.originalPrice && (
                <span className="price-original text-xs">${product.originalPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star size={10} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-muted">{product.rating}</span>
            </div>
          </div>
          {/* Color dots */}
          <div className="flex gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c }} />
            ))}
            {product.colors.length > 4 && <span className="text-xs text-muted">+{product.colors.length - 4}</span>}
          </div>
        </div>
      </Link>
    </div>
  )
}
