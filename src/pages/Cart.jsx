import { Link } from 'react-router-dom'
import { findAddonById, findProductById } from '@/data/mockData'
import { useCartStore } from '@/store/cartStore'

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function getLinePricing(line) {
  const product = findProductById(line.productId)
  const variant = product?.variants?.find((v) => v.id === line.variantId) ?? product?.variants?.[0]
  const addonsTotal =
    line.addons?.reduce((sum, addonSelection) => {
      const addon = findAddonById(addonSelection.addonId)
      return sum + (addon?.price ?? 0) * (addonSelection.qty ?? 1)
    }, 0) ?? 0

  const unitPrice = (variant?.price ?? 0) + addonsTotal
  return { product, variant, unitPrice, lineTotal: unitPrice * line.qty }
}

export default function Cart() {
  const lines = useCartStore((s) => s.lines)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const clear = useCartStore((s) => s.clear)

  const enriched = lines.map((line) => ({ line, ...getLinePricing(line) }))
  const subtotal = enriched.reduce((sum, item) => sum + item.lineTotal, 0)
  const pointsPreview = Math.floor(subtotal)

  if (lines.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Carrinho</p>
          <h1 className="text-3xl font-semibold text-slate-900">Seu carrinho está vazio</h1>
          <p className="text-slate-500">Explore o catálogo e escolha um arranjo para entregar em Araguaína.</p>
        </header>
        <Link to="/catalog" className="inline-flex px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
          Ver catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-2 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Carrinho</p>
          <h1 className="text-3xl font-semibold text-slate-900">Revisão da compra</h1>
        </div>
        <button type="button" onClick={clear} className="text-sm font-semibold text-purple-700 hover:underline">
          Limpar carrinho
        </button>
      </header>

      <div className="bg-white rounded-3xl shadow-lg divide-y divide-purple-50">
        {enriched.map(({ line, product, variant, unitPrice, lineTotal }) => (
          <div key={line.lineId} className="flex flex-wrap gap-6 p-6 items-start">
            <div className="flex-1 min-w-[220px] space-y-1">
              <p className="text-xs uppercase tracking-[0.4em] text-purple-400">{product?.category}</p>
              <h2 className="text-xl font-semibold text-slate-900">{product?.name}</h2>
              <p className="text-sm text-slate-500">Variação: {variant?.name ?? '—'}</p>
              {line.addons?.length > 0 && (
                <p className="text-sm text-slate-500">
                  Complementos:{' '}
                  {line.addons
                    .map((addonSelection) => {
                      const addon = findAddonById(addonSelection.addonId)
                      return addon ? `${addon.name}` : null
                    })
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
              {(line.deliveryDate || line.deliveryWindow) && (
                <p className="text-sm text-slate-500">
                  Entrega: {line.deliveryDate ?? '—'} {line.deliveryWindow ? `(${line.deliveryWindow})` : ''}
                </p>
              )}
              {line.message && <p className="text-sm text-slate-500">Cartão: “{line.message}”</p>}
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-600">
                Qtd
                <input
                  type="number"
                  min={1}
                  value={line.qty}
                  onChange={(e) => updateQty(line.lineId, Number(e.target.value))}
                  className="ml-2 w-20 bg-white border border-purple-100 rounded-2xl px-3 py-2 focus:border-purple-300 focus:outline-none"
                />
              </label>
              <button
                type="button"
                onClick={() => removeItem(line.lineId)}
                className="text-sm font-semibold text-rose-600 hover:underline"
              >
                Remover
              </button>
            </div>

            <div className="text-right ml-auto">
              <p className="text-sm text-slate-500">{formatBRL(unitPrice)} / un</p>
              <p className="text-2xl font-bold text-purple-600">{formatBRL(lineTotal)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-700">Subtotal: {formatBRL(subtotal)}</p>
          <p className="text-sm text-slate-500">Você pode ganhar ~{pointsPreview} pontos neste pedido.</p>
        </div>
        <Link to="/checkout" className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
          Prosseguir para checkout
        </Link>
      </div>
    </div>
  )
}

