import { Link } from 'react-router-dom'
import { categories, products } from '@/data/mockData'

export default function Catalog() {
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-10">
      <header className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Catálogo Completo</p>
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Flores, arranjos e presentes feitos à mão</h1>
        <p className="text-slate-600 max-w-3xl">
          Inspiração para datas especiais, datas comemorativas ou momentos do cotidiano. Explore as coleções inspiradas em tons e emoções.
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <span key={category.id} className="px-4 py-2 text-xs uppercase tracking-wide rounded-full border border-purple-200 text-purple-600">
            {category.name}
          </span>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {products.map((product) => (
          <article key={product.id} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
            <div className="relative h-56">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              {product.featured && (
                <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-purple-600 text-white rounded-full shadow-lg">
                  Destaque
                </span>
              )}
            </div>
            <div className="p-6 flex flex-col gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-purple-500">{product.category}</p>
                <h2 className="text-2xl font-semibold text-slate-900 mt-1">{product.name}</h2>
              </div>
              <p className="text-slate-500">{product.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-purple-600">R$ {product.price.toFixed(2)}</p>
                  <p className="text-xs text-slate-400">{product.details.join(' · ')}</p>
                </div>
                <Link to={`/product/${product.slug}`} className="text-sm font-semibold text-purple-600 hover:underline">
                  Ver produto
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
