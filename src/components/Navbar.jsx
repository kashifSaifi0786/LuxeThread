import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Search, Heart, Menu, X, Zap } from 'lucide-react'
import { useStore } from '../context/store'
import { products } from '../data/products'

export default function Navbar() {
  const { cartCount, setCartOpen, wishlist, filters, setFilter } = useStore()
  const count = useStore((s) => s.cartCount())
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase()
      setSearchResults(products.filter(p =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      ).slice(0, 5))
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleSearchSelect = (product) => {
    setSearchOpen(false)
    setSearchQuery('')
    navigate(`/product/${product.id}`)
  }

  const navLinks = [
    { label: 'New In', href: '/shop?category=All&sort=newest' },
    { label: 'Tops', href: '/shop?category=Tops' },
    { label: 'Bottoms', href: '/shop?category=Bottoms' },
    { label: 'Outerwear', href: '/shop?category=Outerwear' },
    { label: 'Dresses', href: '/shop?category=Dresses' },
    { label: 'Accessories', href: '/shop?category=Accessories' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled ? 'glass-heavy border-b border-white/[0.06] py-3' : 'bg-transparent py-5'}`}
      >
        <div className="container-main flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-7 h-7 bg-electric rounded-lg flex items-center justify-center animate-pulse-glow">
              <Zap size={14} fill="white" className="text-white" />
            </div>
            <span className="font-display text-xl text-white tracking-tight">
              Luxe<span className="text-gradient-electric">Thread</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="px-4 py-2 text-sm text-muted hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <button onClick={() => setSearchOpen(!searchOpen)} className="btn-icon">
                {searchOpen ? <X size={16} /> : <Search size={16} />}
              </button>

              {/* Search Dropdown */}
              {searchOpen && (
                <div className="absolute right-0 top-14 w-80 glass-heavy rounded-2xl border border-white/10 shadow-glow-lg overflow-hidden animate-scale-in">
                  <div className="p-3">
                    <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3">
                      <Search size={14} className="text-muted" />
                      <input
                        ref={searchRef}
                        autoFocus
                        type="text"
                        placeholder="Search pieces..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent py-3 text-sm text-white placeholder:text-muted w-full focus:outline-none"
                      />
                    </div>
                  </div>
                  {searchResults.length > 0 && (
                    <div className="border-t border-white/5">
                      {searchResults.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSearchSelect(p)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                        >
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                          <div>
                            <div className="text-sm text-white font-medium">{p.name}</div>
                            <div className="text-xs text-muted">{p.brand} · ${p.price}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="btn-icon relative">
              <Heart size={16} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-electric text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button onClick={() => setCartOpen(true)} className="btn-icon relative">
              <ShoppingBag size={16} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-electric text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="btn-icon lg:hidden">
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className={`fixed inset-0 z-40 glass-heavy transition-all duration-400
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
          {navLinks.map((l, i) => (
            <Link
              key={l.label}
              to={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl text-white hover:text-gradient-electric transition-all"
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
