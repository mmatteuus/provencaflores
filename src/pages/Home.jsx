import { Link } from 'react-router-dom'
import { categories, featuredProducts, products, testimonials } from '@/data/mockData'

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 to-pink-500 text-white px-4 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.5em] text-purple-200">Entrega em Araguaína</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">Flores frescas para celebrar momentos</h1>
            <p className="text-lg text-purple-100">
              Do carinho do bilhete ao acabamento da embalagem: escolhas pensadas para surpreender com entrega local.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/catalog" className="px-6 py-3 rounded-full bg-white text-purple-700 font-semibold shadow-lg hover:bg-purple-50 transition">
                Ver catálogo
              </Link>
              <Link to="/contact" className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:border-purple-200 transition">
                Fale conosco
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group block rounded-2xl overflow-hidden shadow-xl bg-white text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                aria-label={`Ver ${product.name}`}
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="h-40 w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="p-4 space-y-1">
                  <p className="text-xs uppercase tracking-wide text-purple-500">{product.category}</p>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-slate-500">A partir de {formatBRL(product.priceFrom)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Destaques</p>
            <h2 className="text-3xl font-bold text-slate-900">Coleções em evidência</h2>
          </div>
          <Link to="/catalog" className="text-sm text-purple-600 font-semibold hover:underline">
            Ver tudo
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="group block bg-white rounded-2xl shadow-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label={`Ver ${product.name}`}
            >
              <article className="flex flex-col h-full">
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs uppercase tracking-[0.4em] text-purple-400">{product.category}</span>
                  <h3 className="text-2xl font-semibold text-slate-900 mt-2">{product.name}</h3>
                  <p className="text-sm text-slate-500 mt-2 flex-1">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-purple-600">{formatBRL(product.priceFrom)}</p>
                    <span className="text-sm font-semibold text-purple-600 group-hover:underline">Ver detalhes</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-purple-500">Categorias</p>
            <h2 className="text-3xl font-semibold text-slate-900">Escolha o estilo perfeito</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <article key={category.id} className="rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col lg:flex-row">
                <img src={category.image} alt={category.name} loading="lazy" decoding="async" className="h-40 w-full lg:w-48 object-cover" />
                <div className="p-6 flex flex-col">
                  <h3 className="text-xl font-semibold text-purple-700">{category.name}</h3>
                  <p className="text-sm text-slate-500 mt-2 flex-1">{category.description}</p>
                  <Link to="/catalog" className="mt-4 text-sm font-semibold text-purple-600 hover:underline">
                    Explorar {category.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 space-y-6 pb-12">
        <div>
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Clientes</p>
          <h2 className="text-3xl font-bold text-slate-900">Depoimentos</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-2xl bg-white shadow-lg p-6 space-y-3">
              <p className="text-lg text-slate-600">“{testimonial.quote}”</p>
              <p className="text-sm font-semibold text-purple-600">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
