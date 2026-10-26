import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Package, RotateCcw, Shield } from 'lucide-react'
import { products, heroSlides } from '../data/products'
import ProductCard from '../components/ProductCard'

const perks = [
  { icon: Package, text: 'Free shipping over $200' },
  { icon: RotateCcw, text: '30-day returns' },
  { icon: Shield, text: 'Authentic guarantee' },
  { icon: Sparkles, text: 'Curated luxury' },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80)
    timerRef.current = setInterval(() => setSlide(p => (p + 1) % heroSlides.length), 6000)
    return () => clearInterval(timerRef.current)
  }, [])

  const goSlide = (i) => {
    setSlide(i)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setSlide(p => (p + 1) % heroSlides.length), 6000)
  }

  const featured = products.filter(p => p.badge === 'Icon' || p.badge === 'Best Seller' || p.badge === 'Fan Favourite').slice(0, 4)
  const newArrivals = products.filter(p => p.badge === 'New').slice(0, 4)

  const current = heroSlides[slide]

  return (
    <div className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: slide === i ? 1 : 0 }}
          >
            <img src={s.bg} alt="" className="w-full h-full object-cover object-top" />
          </div>
        ))}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/90 via-indigo-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-indigo-950/20" />
        {/* Mesh overlay */}
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: `radial-gradient(at 30% 40%, ${current.accent}33 0px, transparent 60%)` }} />

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center container-main pt-24">
          <div className="max-w-2xl">
            <div
              key={slide}
              className="animate-fade-up"
              style={{ animationDuration: '0.8s' }}
            >
              <div className="section-label mb-4">{current.label}</div>
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-normal text-white leading-[1.0] mb-6 whitespace-pre-line">
                {current.title}
              </h1>
              <p className="text-muted text-lg mb-8">{current.sub}</p>
              <Link to="/shop" className="btn-primary px-8 py-4 text-base rounded-full">
                {current.cta}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="relative z-10 container-main pb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goSlide(i)}
                className={`transition-all duration-300 rounded-full ${slide === i ? 'w-8 h-2 bg-electric' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => goSlide((slide - 1 + heroSlides.length) % heroSlides.length)} className="btn-icon">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => goSlide((slide + 1) % heroSlides.length)} className="btn-icon">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Perks strip ─── */}
      <div className="border-y border-white/5 bg-indigo-900/20">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            {perks.map((p, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-5">
                <p.icon size={18} className="text-electric-light flex-shrink-0" />
                <span className="text-sm text-muted">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Featured ─── */}
      <section className="py-20 container-main">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">Curated Picks</p>
            <h2 className="font-display text-4xl md:text-5xl text-white">Iconic <span className="italic text-gradient">Pieces</span></h2>
          </div>
          <Link to="/shop" className="btn-ghost text-sm gap-1.5 hidden md:flex">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* ─── Banner ─── */}
      <section className="container-main mb-20">
        <div className="relative overflow-hidden rounded-3xl mesh-bg border border-indigo-700/30 min-h-56 flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/60 to-transparent" />
          <div className="relative z-10 p-8 md:p-14">
            <p className="section-label mb-3">Autumn Wardrobe</p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Dressed for<br /><span className="italic text-gradient">Everything</span>
            </h2>
            <Link to="/shop?category=Outerwear" className="btn-primary rounded-full">
              Shop Outerwear <ArrowRight size={16} />
            </Link>
          </div>
          {/* Decorative circles */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-electric/20 hidden md:block" />
          <div className="absolute right-20 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-electric/10 hidden md:block" />
        </div>
      </section>

      {/* ─── New Arrivals ─── */}
      <section className="py-4 pb-20 container-main">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">Just Dropped</p>
            <h2 className="font-display text-4xl md:text-5xl text-white">New <span className="italic text-gradient">Arrivals</span></h2>
          </div>
          <Link to="/shop?sort=newest" className="btn-ghost text-sm gap-1.5 hidden md:flex">
            See more <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section className="container-main pb-24">
        <div className="glass rounded-3xl border border-white/10 p-10 md:p-16 text-center">
          <p className="section-label mb-4">The Inner Circle</p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-3">
            First Access, <span className="italic text-gradient">Always</span>
          </h2>
          <p className="text-muted max-w-md mx-auto mb-8">
            Early access to drops, private sales, and edit notes from our creative directors. No noise.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="input-field rounded-full py-4"
            />
            <button className="btn-primary rounded-full py-4 px-8 whitespace-nowrap">
              Join
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
