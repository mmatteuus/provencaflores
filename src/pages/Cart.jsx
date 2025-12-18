import { Link } from 'react-router-dom'
import { cartItems, products } from '@/data/mockData'

export default function Cart() {
  const items = cartItems.map((item) => {
    const product = products.find((productItem) => productItem.id === item.productId)
    return {
      ...item,
      product,
      total: product ? product.price * item.quantity : 0,
    }
  })

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Carrinho</p>
        <h1 className="text-3xl font-semibold text-slate-900">Revisão da compra</h1>
      </header>
      <div className="bg-white rounded-3xl shadow-lg divide-y divide-purple-50">
        {items.map((item) => (
          <div key={item.productId} className="flex flex-wrap gap-6 p-6 items-center">
            <div className="flex-1 min-w-[180px]">
              <p className="text-sm uppercase tracking-[0.4em] text-purple-400">{item.product?.category}</p>
              <h2 className="text-xl font-semibold text-slate-900">{item.product?.name}</h2>
              <p className="text-sm text-slate-500">Quantidade: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Total</p>
              <p className="text-2xl font-bold text-purple-600">R$ {item.total.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-lg font-semibold text-slate-700">Subtotal: R$ {subtotal.toFixed(2)}</p>
        <Link to="/checkout" className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
          Prosseguir para checkout
        </Link>
      </div>
    </div>
  )
}
