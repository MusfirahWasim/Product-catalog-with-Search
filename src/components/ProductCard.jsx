import { useState } from 'react'

const CATEGORY_COLORS = {
  Electronics: 'bg-blue-50 text-blue-600',
  Home:        'bg-emerald-50 text-emerald-600',
  Kitchen:     'bg-amber-50 text-amber-600',
  Stationery:  'bg-violet-50 text-violet-600',
}

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false)
  const color = CATEGORY_COLORS[product.category] || 'bg-stone-100 text-stone-500'

  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

      {/* Image */}
      <div className="w-full h-44 bg-stone-100 overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          // fallback if image fails to load
          <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-stone-900 leading-snug">{product.name}</h3>
          <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full ${color}`}>
            {product.category}
          </span>
        </div>

        <p className="text-xs text-stone-400 leading-relaxed">{product.description}</p>

        <div className="mt-auto pt-3 border-t border-stone-100">
          <span className="text-lg font-semibold text-stone-900">Rs.{product.price.toFixed(2)}</span>
        </div>
      </div>

    </div>
  )
}
