import { useState, useMemo } from 'react'
import products from './products'
import ProductCard from './components/ProductCard'

const CATEGORIES = ['All', 'Electronics', 'Home', 'Kitchen', 'Stationery']
const SORT_OPTIONS = [
  { label: 'Default',     value: 'default' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Name A → Z', value: 'name_asc' },
]

export default function App() {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(200)
  const [sort,     setSort]     = useState('default')

  const filtered = useMemo(() => {
    let list = [...products]

    // filter by name
    if (search.trim()) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // filter by category
    if (category !== 'All') {
      list = list.filter(p => p.category === category)
    }

    // filter by max price
    list = list.filter(p => p.price <= maxPrice)

    // sort
    if (sort === 'price_asc')  list.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name_asc')   list.sort((a, b) => a.name.localeCompare(b.name))

    return list
  }, [search, category, maxPrice, sort])

  const handleReset = () => {
    setSearch('')
    setCategory('All')
    setMaxPrice(200)
    setSort('default')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0efed' }}>

      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="w-full px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-stone-900 flex items-center justify-center">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            <span className="text-base font-semibold text-stone-900">ProductCatalog</span>
          </div>
          <span className="text-sm text-stone-400 font-mono">
            {filtered.length} / {products.length} products
          </span>
        </div>
      </header>

      <main className="w-full px-12 py-10">
        <div className="grid gap-10 items-start" style={{ gridTemplateColumns: '280px 1fr' }}>

          {/* ── Sidebar filters ── */}
          <aside className="sticky top-24 bg-white rounded-2xl border border-stone-100 p-7 flex flex-col gap-7">

            <div>
              <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-1">Filters</p>
              <h2 className="text-xl font-semibold text-stone-900">Search & Filter</h2>
            </div>

            {/* Search by name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Search by name</label>
              <input
                type="text"
                placeholder="e.g. Keyboard…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-stone-700 transition-colors"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Category</label>
              <div className="flex flex-col gap-1.5">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors
                      ${category === cat
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Max price slider */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                Max Price — <span className="text-stone-900 font-semibold">Rs.{maxPrice}</span>
              </label>
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-stone-400">
                <span>Rs.5</span>
                <span>Rs.200</span>
              </div>
            </div>

            {/* Sort */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Sort by</label>
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-700 appearance-none cursor-pointer transition-colors"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-xs">▾</span>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl text-sm font-medium border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Reset Filters
            </button>
          </aside>

          {/* ── Product grid ── */}
          <div>
            <div className="mb-6">
              <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-0.5">Catalog</p>
              <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">All Products</h1>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-100 py-24 flex flex-col items-center justify-center text-center">
                <span className="text-4xl mb-4">🔍</span>
                <p className="text-sm font-medium text-stone-500">No products found</p>
                <p className="text-xs text-stone-400 mt-1">Try adjusting your filters</p>
                <button
                  onClick={handleReset}
                  className="mt-5 px-5 py-2.5 rounded-xl text-sm font-medium bg-stone-900 text-white hover:bg-stone-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
