import { cartItems, products } from '@/data/mockData'

export default function Checkout() {
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
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Checkout</p>
        <h1 className="text-3xl font-semibold text-slate-900">Finalize seu pedido</h1>
        <p className="text-slate-500">Preencha seus dados e receba o arranjo no conforto do lar.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        <form className="space-y-4 bg-white rounded-3xl shadow-lg p-6">
          <label className="block space-y-2 text-sm text-slate-600">
            <span>Nome completo</span>
            <input className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none" placeholder="Maria Souza" />
          </label>
          <label className="block space-y-2 text-sm text-slate-600">
            <span>E-mail</span>
            <input className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none" placeholder="maria@email.com" />
          </label>
          <label className="block space-y-2 text-sm text-slate-600">
            <span>Endereço de entrega</span>
            <input className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none" placeholder="Rua das Flores, 123" />
          </label>
          <label className="block space-y-2 text-sm text-slate-600">
            <span>Observações</span>
            <textarea rows={3} className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none" placeholder="Deixe uma mensagem para o arranjo..." />
          </label>
        </form>
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Resumo do pedido</h2>
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm text-slate-500">
              <span>{item.product?.name} x{item.quantity}</span>
              <span>R$ {item.total.toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-purple-100 pt-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Total</span>
            <span className="text-lg font-bold text-purple-600">R$ {subtotal.toFixed(2)}</span>
          </div>
          <button type="button" className="w-full px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
            Confirmar pedido
          </button>
        </div>
      </div>
    </div>
  )
}
