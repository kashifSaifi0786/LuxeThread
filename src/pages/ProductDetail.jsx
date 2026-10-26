import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Heart, ShoppingBag, ChevronLeft, ChevronRight, Truck, RotateCcw, Shield, Package, ArrowLeft, Share2 } from 'lucide-react'
import { products } from '../data/products'
import { useStore } from '../context/store'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === +id)
  const { addToCart, toggleWishlist, isWishlisted, addToast, setCartOpen } = useStore()
  const wishlisted = useStore((s) => s.isWishlisted(product?.id))

  const [imgIdx, setImgIdx] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(0)
  const [sizeError, setSizeError] = useState(false)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-24">
        <p className="font-display text-4xl text-white">404</p>
        <p className="text-muted">Product not found</p>
        <Link to="/shop" className="btn-primary rounded-full">Back to Shop</Link>
      </div>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null

  const handleAdd = () => {
    if (!selectedSize) { setSizeError(true); return }
    for (let i = 0; i < qty; i++) {
      addToCart(product, selectedSize, product.colors[selectedColor])
    }
    addToast(`${product.name} added to bag`, 'success')
    setTimeout(() => setCartOpen(true), 300)
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-main">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-white transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative overflow-hidden rounded-3xl bg-indigo-900/40 aspect-[3/4] group">
              <img
                src={product.images[imgIdx]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {product.badge && (
                <div className="absolute top-5 left-5 tag-electric">{product.badge}</div>
              )}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx(p => (p - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 btn-icon bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setImgIdx(p => (p + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 btn-icon bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200
                      ${imgIdx === i ? 'border-electric' : 'border-transparent hover:border-white/30'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="section-label">{product.brand}</p>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`btn-icon ${wishlisted ? 'border-red-400 text-red-400 bg-red-400/10' : ''}`}
                >
                  <Heart size={16} className={wishlisted ? 'fill-red-400' : ''} />
                </button>
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-white mb-3">{product.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted'} />
                  ))}
                </div>
                <span className="text-sm text-muted">{product.rating} · {product.reviews} reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-3xl text-white font-medium">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="price-original text-lg">${product.originalPrice}</span>
                  <span className="tag bg-green-500/15 text-green-400 border border-green-500/20">-{discount}%</span>
                </>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map(t => <span key={t} className="tag-muted">{t}</span>)}
            </div>

            {/* Color */}
            <div>
              <p className="text-sm text-muted mb-3">Colour — <span className="text-white font-medium">{product.colorNames[selectedColor]}</span></p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === i ? 'border-electric scale-110' : 'border-transparent hover:border-white/40'}`}
                    style={{ backgroundColor: c }}
                    title={product.colorNames[i]}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className={`text-sm ${sizeError ? 'text-red-400' : 'text-muted'}`}>
                  {sizeError ? '⚠ Please select a size' : 'Size'}
                </p>
                <button className="text-xs text-electric-light hover:underline">Size guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSelectedSize(s); setSizeError(false) }}
                    className={`min-w-14 px-4 py-2.5 text-sm rounded-xl border transition-all duration-200
                      ${selectedSize === s
                        ? 'border-electric bg-electric/15 text-white'
                        : 'border-white/10 text-muted hover:border-white/30 hover:text-white'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add */}
            <div className="flex gap-3">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors">
                  <ChevronLeft size={14} />
                </button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
              <button onClick={handleAdd} className="btn-primary flex-1 py-4 rounded-xl text-base">
                <ShoppingBag size={18} />
                Add to Bag — ${(product.price * qty).toLocaleString()}
              </button>
              <button className="btn-icon w-12 h-12 rounded-xl">
                <Share2 size={16} />
              </button>
            </div>

            {/* Shipping perks */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Truck, text: 'Free shipping over $200' },
                { icon: RotateCcw, text: '30-day easy returns' },
                { icon: Shield, text: 'Authenticity guaranteed' },
                { icon: Package, text: 'Luxury gift packaging' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted">
                  <p.icon size={13} className="text-electric-light flex-shrink-0" />
                  {p.text}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex gap-1 mb-5 bg-white/5 rounded-xl p-1">
                {['description', 'materials', 'reviews'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2 text-sm rounded-lg capitalize transition-all
                      ${tab === t ? 'bg-electric text-white' : 'text-muted hover:text-white'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {tab === 'description' && <p className="text-muted leading-relaxed text-sm">{product.description}</p>}
              {tab === 'materials' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-muted">Composition</span>
                    <span className="text-white">{product.materials}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-muted">Brand</span>
                    <span className="text-white">{product.brand}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Category</span>
                    <span className="text-white">{product.category}</span>
                  </div>
                </div>
              )}
              {tab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-display text-white">{product.rating}</div>
                    <div>
                      <div className="flex gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted'} />
                        ))}
                      </div>
                      <p className="text-sm text-muted">Based on {product.reviews} reviews</p>
                    </div>
                  </div>
                  {[['Fit', 90], ['Quality', 95], ['Value', 82]].map(([label, pct]) => (
                    <div key={label} className="flex items-center gap-3 text-sm">
                      <span className="text-muted w-16">{label}</span>
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-electric rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-muted w-8 text-right">{pct}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="section-label mb-1">More to Love</p>
                <h2 className="font-display text-3xl text-white">You Might Also <span className="italic text-gradient">Like</span></h2>
              </div>
              <Link to={`/shop?category=${product.category}`} className="btn-ghost text-sm">
                See all {product.category} <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
