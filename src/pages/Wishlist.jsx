import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '../context/store'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist } = useStore()
  const wishlisted = products.filter(p => wishlist.includes(p.id))

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-main">
        <div className="mb-10">
          <p className="section-label mb-1">Your Collection</p>
          <h1 className="font-display text-4xl md:text-5xl text-white">
            Saved <span className="italic text-gradient">Pieces</span>
          </h1>
          <p className="text-muted mt-2">{wishlisted.length} {wishlisted.length === 1 ? 'item' : 'items'}</p>
        </div>

        {wishlisted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
            <div className="w-20 h-20 rounded-full bg-indigo-800/40 flex items-center justify-center">
              <Heart size={32} className="text-muted" />
            </div>
            <div>
              <p className="text-white font-medium mb-1">Nothing saved yet</p>
              <p className="text-muted text-sm">Heart pieces you love to save them here</p>
            </div>
            <Link to="/shop" className="btn-primary rounded-full mt-2">
              <ShoppingBag size={16} />
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {wishlisted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
