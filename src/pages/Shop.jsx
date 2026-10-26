import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown, Search, LayoutGrid, LayoutList } from 'lucide-react'
import { products, categories, brands, sortOptions } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/store'

export default function Shop() {
  const { filters, setFilter, resetFilters } = useStore()
  const [searchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [view, setView] = useState('grid')

  // Sync URL params to filters on mount
  useEffect(() => {
    const cat = searchParams.get('category')
    const sort = searchParams.get('sort')
    if (cat) setFilter('category', cat)
    if (sort) setFilter('sort', sort)
  }, [])

  const filtered = useMemo(() => {
    let list = [...products]
    if (filters.category !== 'All') list = list.filter(p => p.category === filters.category)
    if (filters.brands.length > 0) list = list.filter(p => filters.brands.includes(p.brand))
    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    }
    list = list.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])
    switch (filters.sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'rating': list.sort((a, b) => b.rating - a.rating); break
      case 'newest': list = list.filter(p => p.badge === 'New').concat(list.filter(p => p.badge !== 'New')); break
    }
    return list
  }, [filters])

  const activeFilterCount = (filters.category !== 'All' ? 1 : 0) + filters.brands.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0)

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-main">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label mb-1">Collection</p>
            <h1 className="font-display text-4xl md:text-5xl text-white">
              {filters.category === 'All' ? <span>All <span className="italic text-gradient">Pieces</span></span> : filters.category}
            </h1>
            <p className="text-muted text-sm mt-1">{filtered.length} items</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-white/10">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 flex-1 min-w-48 max-w-72">
            <Search size={14} className="text-muted flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              className="bg-transparent text-sm text-white placeholder:text-muted w-full focus:outline-none"
            />
            {filters.search && (
              <button onClick={() => setFilter('search', '')} className="text-muted hover:text-white">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter('category', c)}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-200
                  ${filters.category === c
                    ? 'bg-electric border-electric text-white'
                    : 'border-white/10 text-muted hover:border-white/30 hover:text-white'}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-2">
            {/* Sort */}
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) => setFilter('sort', e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 text-white text-sm rounded-full
                           pl-4 pr-8 py-2.5 cursor-pointer focus:border-electric/50 focus:outline-none
                           hover:border-white/30 transition-colors"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value} className="bg-indigo-950">{o.label}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>

            {/* Filter button */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-full border transition-all
                ${activeFilterCount > 0 ? 'border-electric bg-electric/15 text-white' : 'border-white/10 text-muted hover:border-white/30 hover:text-white'}`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && <span className="w-4 h-4 bg-electric rounded-full text-white text-xs flex items-center justify-center">{activeFilterCount}</span>}
            </button>

            {/* View toggle */}
            <div className="flex bg-white/5 border border-white/10 rounded-full p-0.5">
              <button onClick={() => setView('grid')} className={`p-2 rounded-full transition-colors ${view === 'grid' ? 'bg-electric text-white' : 'text-muted hover:text-white'}`}>
                <LayoutGrid size={14} />
              </button>
              <button onClick={() => setView('list')} className={`p-2 rounded-full transition-colors ${view === 'list' ? 'bg-electric text-white' : 'text-muted hover:text-white'}`}>
                <LayoutList size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {filtersOpen && (
          <div className="glass rounded-2xl border border-white/10 p-6 mb-8 animate-fade-up">
            <div className="flex flex-wrap gap-8">
              {/* Brands */}
              <div>
                <p className="text-xs uppercase tracking-wider text-muted mb-3">Brand</p>
                <div className="flex flex-wrap gap-2">
                  {brands.map(b => (
                    <button
                      key={b}
                      onClick={() => {
                        const next = filters.brands.includes(b)
                          ? filters.brands.filter(x => x !== b)
                          : [...filters.brands, b]
                        setFilter('brands', next)
                      }}
                      className={`px-4 py-2 text-sm rounded-full border transition-all
                        ${filters.brands.includes(b) ? 'border-electric bg-electric/15 text-white' : 'border-white/10 text-muted hover:border-white/30 hover:text-white'}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price */}
              <div className="min-w-48">
                <p className="text-xs uppercase tracking-wider text-muted mb-3">
                  Price: ${filters.priceRange[0]} – ${filters.priceRange[1]}
                </p>
                <input
                  type="range" min={0} max={1000} step={25}
                  value={filters.priceRange[1]}
                  onChange={e => setFilter('priceRange', [filters.priceRange[0], +e.target.value])}
                  className="w-full accent-electric"
                />
              </div>
              <button onClick={resetFilters} className="ml-auto btn-ghost text-sm self-end">
                <X size={14} /> Reset all
              </button>
            </div>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-4xl">🔍</p>
            <p className="text-white font-medium">No pieces found</p>
            <p className="text-muted text-sm">Try adjusting your filters</p>
            <button onClick={resetFilters} className="btn-secondary mt-2">Clear filters</button>
          </div>
        ) : (
          <div className={view === 'grid'
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6'
            : 'flex flex-col gap-4'
          }>
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
