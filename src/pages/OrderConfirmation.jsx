import { Link, useParams } from 'react-router-dom'
import { findAddonById, findProductById } from '@/data/mockData'
import { getOrderById } from '@/store/orderStore'
import { paymentProvider } from '@/payments/provider'

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function windowLabel(windowId) {
  if (windowId === 'MANHA_9_12') return 'Manhã (9–12)'
  if (windowId === 'TARDE_13_18') return 'Tarde (13–18)'
  return windowId
}

export default function OrderConfirmation() {
  const { orderId } = useParams()
  const order = orderId ? getOrderById(orderId) : undefined

  if (!order) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-lg p-10 text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Pedido</p>
          <h1 className="text-3xl font-semibold text-slate-900">Não encontramos esse pedido</h1>
          <p className="text-slate-500">Se você acabou de finalizar, volte ao catálogo e tente novamente.</p>
          <Link to="/catalog" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
            Ver catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <header className="bg-white rounded-3xl shadow-lg p-8 space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Pedido recebido</p>
        <h1 className="text-3xl font-semibold text-slate-900">Agradecemos pela compra!</h1>
        <p className="text-slate-500">
          Pedido <span className="font-semibold text-slate-800">{order.id}</span> · {new Date(order.createdAt).toLocaleString('pt-BR')}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Itens</h2>
          <div className="space-y-3">
            {order.lines.map((line, index) => {
              const product = findProductById(line.productId)
              const variant = product?.variants?.find((v) => v.id === line.variantId) ?? product?.variants?.[0]
              return (
                <div key={`${line.productId}_${index}`} className="text-sm text-slate-600">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">
                        {product?.name} · {variant?.name} × {line.qty}
                      </p>
                      {line.addons?.length > 0 && (
                        <p className="text-slate-500">
                          Complementos:{' '}
                          {line.addons
                            .map((addonSelection) => findAddonById(addonSelection.addonId)?.name)
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      )}
                      {line.message && <p className="text-slate-500">Cartão: “{line.message}”</p>}
                    </div>
                    <p className="font-semibold text-slate-900">{formatBRL(line.lineTotal)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">Entrega</h2>
            <p className="text-sm text-slate-600">{order.delivery.address}</p>
            <p className="text-sm text-slate-600">
              {order.delivery.neighborhood} · {order.delivery.date} · {windowLabel(order.delivery.window)}
            </p>
            {order.delivery.notes && <p className="text-sm text-slate-500">Obs.: {order.delivery.notes}</p>}
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">Pagamento</h2>
            <p className="text-sm text-slate-600">
              Método: {order.payment.method === 'STONE_LINK' ? 'Link Stone' : order.payment.method} · Status: {order.payment.status}
            </p>
            {order.payment.method === 'STONE_LINK' && order.payment.status === 'PENDING' && paymentProvider.paymentLinkUrl && (
              <a
                href={paymentProvider.paymentLinkUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-2 items-center justify-center px-4 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
              >
                Pagar agora (Stone)
              </a>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">Totais</h2>
            <div className="text-sm text-slate-600 space-y-1">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatBRL(order.totals.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Frete</span>
                <span className="font-semibold text-slate-900">{formatBRL(order.totals.shipping)}</span>
              </div>
              {order.totals.discount > 0 && (
                <div className="flex items-center justify-between">
                  <span>Desconto</span>
                  <span className="font-semibold text-slate-900">- {formatBRL(order.totals.discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-purple-100">
                <span className="font-semibold">Total</span>
                <span className="text-lg font-bold text-purple-700">{formatBRL(order.totals.total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">Pontos</h2>
            <p className="text-sm text-slate-600">
              Ganhos: <span className="font-semibold">{order.loyalty.pointsEarned}</span> · Usados:{' '}
              <span className="font-semibold">{order.loyalty.pointsUsed}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/catalog" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
          Ver mais arranjos
        </Link>
        <Link to="/minha-conta" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-purple-200 text-purple-700 font-semibold hover:bg-purple-50 transition">
          Ver pontos
        </Link>
      </div>
    </div>
  )
}
