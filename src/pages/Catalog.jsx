import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, products } from '@/data/mockData'

function normalizeText(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function categoryKey(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = useMemo(() => {
    const query = normalizeText(searchTerm)

    const result = products.filter((product) => {
      const matchesCategory = categoryFilter === 'all' ? true : categoryKey(product.category) === categoryFilter
      const matchesQuery =
        query.length === 0
          ? true
          : normalizeText(`${product.name} ${product.description} ${product.category}`).includes(query)
      return matchesCategory && matchesQuery
    })

    switch (sortBy) {
      case 'price_asc':
        return result.slice().sort((a, b) => a.priceFrom - b.priceFrom)
      case 'price_desc':
        return result.slice().sort((a, b) => b.priceFrom - a.priceFrom)
      case 'name_asc':
        return result.slice().sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
      case 'featured':
      default:
        return result.slice().sort((a, b) => Number(b.featured) - Number(a.featured))
    }
  }, [searchTerm, categoryFilter, sortBy])

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-10">
      <header className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Catálogo</p>
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Flores, arranjos e presentes</h1>
        <p className="text-slate-600 max-w-3xl">
          Busque por produto, filtre por categoria e escolha a melhor opção para entregar em Araguaína.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-3">
        <label className="md:col-span-2">
          <span className="sr-only">Buscar</span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar produtos…"
            className="w-full bg-white border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none shadow-sm"
          />
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none shadow-sm"
        >
          <option value="featured">Destaques</option>
          <option value="name_asc">Nome (A–Z)</option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() => setCategoryFilter('all')}
          className={`px-4 py-2 text-xs uppercase tracking-wide rounded-full border transition ${
            categoryFilter === 'all' ? 'bg-purple-600 text-white border-purple-600' : 'border-purple-200 text-purple-700'
          }`}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setCategoryFilter(category.id)}
            className={`px-4 py-2 text-xs uppercase tracking-wide rounded-full border transition ${
              categoryFilter === category.id ? 'bg-purple-600 text-white border-purple-600' : 'border-purple-200 text-purple-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            className="group block bg-white rounded-3xl shadow-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label={`Ver ${product.name}`}
          >
            <article className="flex flex-col h-full">
              <div className="relative h-56">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                {product.delivery?.sameDayEligible && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-full shadow-lg">
                    Entrega hoje
                  </span>
                )}
                {product.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-purple-600 text-white rounded-full shadow-lg">
                    Destaque
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-purple-500">{product.category}</p>
                  <h2 className="text-2xl font-semibold text-slate-900 mt-1">{product.name}</h2>
                </div>
                <p className="text-slate-500">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-lg font-bold text-purple-600">{formatBRL(product.priceFrom)}</p>
                    <p className="text-xs text-slate-400">{product.variants.length} variações · + complementos</p>
                  </div>
                  <span className="text-sm font-semibold text-purple-600 group-hover:underline">Ver produto</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
