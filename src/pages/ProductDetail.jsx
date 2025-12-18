import { Link, useParams } from 'react-router-dom'
import { products } from '@/data/mockData'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Produto não encontrado</p>
        <h1 className="text-3xl font-semibold text-slate-900">Ainda estamos preparando essa página.</h1>
        <Link to="/catalog" className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
          Voltar ao catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.5em] text-purple-500">{product.category}</p>
          <h1 className="text-4xl font-semibold text-slate-900">{product.name}</h1>
          <p className="text-2xl font-bold text-purple-600">R$ {product.price.toFixed(2)}</p>
          <p className="text-slate-600 text-lg">{product.description}</p>
          <ul className="list-disc list-inside text-sm text-slate-500 space-y-1">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/cart"
              className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
            >
              Adicionar ao carrinho
            </Link>
            <Link to="/checkout" className="px-6 py-3 rounded-full border border-purple-200 text-purple-600 font-semibold hover:bg-purple-50 transition">
              Ir para checkout
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-lg p-6 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Experiências Provença</h2>
        <p className="text-sm text-slate-500">
          Cada composição passa por revisão da equipe criativa, garantindo frescor no envio e embalagem personalizada.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-500">
          <div className="space-y-1">
            <p className="font-semibold text-slate-900">Envio</p>
            <p>Entrega expressa ou retirada em loja.</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-slate-900">Ritual</p>
            <p>Manual com dicas de cuidados acompanha o pedido.</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-slate-900">Sustentabilidade</p>
            <p>Material reciclado e fornecedores certificados.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
