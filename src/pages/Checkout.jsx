import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeliveryScheduler from '@/components/DeliveryScheduler'
import { ARAGUAINA_RATES, DELIVERY_WINDOWS, estimateAraguainaShippingBRL, getDefaultDeliveryDateISO } from '@/data/delivery/araguaina'
import { findAddonById, findProductById } from '@/data/mockData'
import { toast } from '@/components/ui/use-toast'
import { useCartStore } from '@/store/cartStore'
import { useLoyaltyStore } from '@/store/loyaltyStore'
import { saveOrder } from '@/store/orderStore'
import { paymentProvider } from '@/payments/provider'

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

const STEPS = ['Dados', 'Entrega', 'Pagamento', 'Revisão']

export default function Checkout() {
  const navigate = useNavigate()

  const lines = useCartStore((s) => s.lines)
  const clearCart = useCartStore((s) => s.clear)

  const pointsBalance = useLoyaltyStore((s) => s.pointsBalance)
  const earnPoints = useLoyaltyStore((s) => s.earnPoints)
  const redeem = useLoyaltyStore((s) => s.redeem)

  const enriched = useMemo(() => lines.map((line) => ({ line, ...getLinePricing(line) })), [lines])
  const subtotal = useMemo(() => enriched.reduce((sum, item) => sum + item.lineTotal, 0), [enriched])

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' })
  const [delivery, setDelivery] = useState({
    address: '',
    neighborhood: 'Centro',
    notes: '',
    deliveryDate: lines[0]?.deliveryDate ?? getDefaultDeliveryDateISO({ sameDayEligible: true }),
    deliveryWindow: lines[0]?.deliveryWindow ?? DELIVERY_WINDOWS[1].id,
  })

  const [payment, setPayment] = useState({ method: 'STONE_LINK' })
  const [pointsToUse, setPointsToUse] = useState(0)

  const shippingBRL = useMemo(() => estimateAraguainaShippingBRL(delivery.neighborhood), [delivery.neighborhood])
  const discountPreview = useMemo(() => Math.min(Math.max(0, Math.floor(pointsToUse)), pointsBalance), [pointsToUse, pointsBalance])
  const total = useMemo(() => Math.max(0, subtotal + shippingBRL - discountPreview), [subtotal, shippingBRL, discountPreview])

  if (lines.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Checkout</p>
          <h1 className="text-3xl font-semibold text-slate-900">Seu carrinho está vazio</h1>
          <p className="text-slate-500">Adicione itens antes de finalizar o pedido.</p>
        </header>
        <Link to="/catalog" className="inline-flex px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
          Ver catálogo
        </Link>
      </div>
    )
  }

  const canGoNext =
    (step === 0 && customer.name.trim() && customer.email.trim()) ||
    (step === 1 && delivery.address.trim() && delivery.neighborhood.trim() && delivery.deliveryDate && delivery.deliveryWindow) ||
    step >= 2

  async function placeOrder() {
    setLoading(true)
    try {
      const { pointsUsed, discountBRL } = redeem(discountPreview)

      const orderLines = enriched.map(({ line, unitPrice, lineTotal }) => ({
        productId: line.productId,
        variantId: line.variantId,
        addons: line.addons ?? [],
        message: line.message ?? '',
        qty: line.qty,
        unitPrice,
        lineTotal,
      }))

      const order = saveOrder({
        customer,
        delivery: {
          address: delivery.address,
          neighborhood: delivery.neighborhood,
          date: delivery.deliveryDate,
          window: delivery.deliveryWindow,
          notes: delivery.notes,
          shippingBRL,
        },
        lines: orderLines,
        totals: {
          subtotal,
          shipping: shippingBRL,
          discount: discountBRL,
          total,
        },
        loyalty: {
          pointsEarned: 0,
          pointsUsed,
        },
        payment: {
          method: payment.method,
          status: 'PENDING',
          reference: payment.method === 'STONE_LINK' ? 'payment_link' : undefined,
        },
      })

      const earned = earnPoints(total)

      saveOrder({
        ...order,
        loyalty: {
          pointsEarned: earned,
          pointsUsed,
        },
        payment: {
          ...order.payment,
          status: payment.method === 'STONE_LINK' ? 'PENDING' : 'PAID',
        },
      })

      clearCart()

      toast({ title: 'Pedido criado', description: `Pedido ${order.id}` })

      navigate(`/pedido/${encodeURIComponent(order.id)}`)
    } catch (error) {
      toast({ title: 'Erro no checkout', description: String(error?.message ?? error), variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Checkout</p>
        <h1 className="text-3xl font-semibold text-slate-900">Finalize seu pedido</h1>
        <p className="text-slate-500">Dados → Entrega → Pagamento → Revisão</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {STEPS.map((label, index) => (
          <span
            key={label}
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              index === step ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-purple-100'
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white rounded-3xl shadow-lg p-6">
          {step === 0 && (
            <>
              <h2 className="text-lg font-semibold text-slate-900">Seus dados</h2>
              <label className="block space-y-2 text-sm text-slate-600">
                <span>Nome completo *</span>
                <input
                  value={customer.name}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
                  placeholder="Maria Souza"
                />
              </label>
              <label className="block space-y-2 text-sm text-slate-600">
                <span>E-mail *</span>
                <input
                  value={customer.email}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
                  placeholder="maria@email.com"
                />
              </label>
              <label className="block space-y-2 text-sm text-slate-600">
                <span>WhatsApp</span>
                <input
                  value={customer.phone}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
                  placeholder="(63) 9 9999-9999"
                />
              </label>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold text-slate-900">Entrega</h2>
              <label className="block space-y-2 text-sm text-slate-600">
                <span>Endereço *</span>
                <input
                  value={delivery.address}
                  onChange={(e) => setDelivery((prev) => ({ ...prev, address: e.target.value }))}
                  className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
                  placeholder="Rua, número, complemento"
                />
              </label>
              <label className="block space-y-2 text-sm text-slate-600">
                <span>Bairro (Araguaína) *</span>
                <select
                  value={delivery.neighborhood}
                  onChange={(e) => setDelivery((prev) => ({ ...prev, neighborhood: e.target.value }))}
                  className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
                >
                  {ARAGUAINA_RATES.map((rate) => (
                    <option key={rate.neighborhood} value={rate.neighborhood}>
                      {rate.neighborhood} — {formatBRL(rate.fee)}
                    </option>
                  ))}
                </select>
              </label>

              <DeliveryScheduler
                sameDayEligible
                value={{ deliveryDate: delivery.deliveryDate, deliveryWindow: delivery.deliveryWindow }}
                onChange={(next) => setDelivery((prev) => ({ ...prev, ...next }))}
              />

              <label className="block space-y-2 text-sm text-slate-600">
                <span>Observações</span>
                <textarea
                  rows={3}
                  value={delivery.notes}
                  onChange={(e) => setDelivery((prev) => ({ ...prev, notes: e.target.value }))}
                  className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
                  placeholder="Ex.: Portaria, referência, instruções…"
                />
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold text-slate-900">Pagamento</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-purple-100 rounded-2xl">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment.method === 'STONE_LINK'}
                    onChange={() => setPayment({ method: 'STONE_LINK' })}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Link de pagamento (Stone)</p>
                    <p className="text-xs text-slate-500">Fase 1: redireciona para pagar via Pix ou cartão.</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-purple-100 rounded-2xl opacity-60">
                  <input type="radio" name="payment" disabled />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Pix (mock)</p>
                    <p className="text-xs text-slate-500">Provider plugável (Fase 2, com camada segura).</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-purple-100 rounded-2xl opacity-60">
                  <input type="radio" name="payment" disabled />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Cartão (mock)</p>
                    <p className="text-xs text-slate-500">Tokenização via Pagar.me/Stone (Fase 2).</p>
                  </div>
                </label>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-slate-900">Usar pontos (desconto)</p>
                <p className="text-xs text-slate-500">Saldo: {pointsBalance} pontos (1 ponto = R$ 1,00)</p>
                <input
                  type="number"
                  min={0}
                  max={pointsBalance}
                  value={pointsToUse}
                  onChange={(e) => setPointsToUse(Number(e.target.value))}
                  className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-semibold text-slate-900">Revisão</h2>
              <div className="text-sm text-slate-600 space-y-2">
                <p>
                  <span className="font-semibold">Cliente:</span> {customer.name} ({customer.email})
                </p>
                <p>
                  <span className="font-semibold">Entrega:</span> {delivery.address} · {delivery.neighborhood} · {delivery.deliveryDate} ·{' '}
                  {delivery.deliveryWindow}
                </p>
                <p>
                  <span className="font-semibold">Pagamento:</span> {payment.method === 'STONE_LINK' ? 'Link Stone' : payment.method}
                </p>
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={placeOrder}
                className="w-full px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition disabled:opacity-60"
              >
                {loading ? 'Processando…' : 'Confirmar pedido'}
              </button>
              <p className="text-xs text-slate-500">
                Política de substituição: itens podem ser substituídos por disponibilidade mantendo padrão e valor.
              </p>
            </>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={step === 0 || loading}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="text-sm font-semibold text-slate-600 hover:underline disabled:opacity-50"
            >
              Voltar
            </button>
            {step < 3 && (
              <button
                type="button"
                disabled={!canGoNext || loading}
                onClick={() => setStep((s) => Math.min(3, s + 1))}
                className="text-sm font-semibold text-purple-700 hover:underline disabled:opacity-50"
              >
                Próximo
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Resumo</h2>
          {enriched.map(({ line, product, variant, lineTotal }) => (
            <div key={line.lineId} className="flex justify-between text-sm text-slate-600 gap-4">
              <span className="min-w-0">
                <span className="font-semibold text-slate-900">{product?.name}</span> · {variant?.name} × {line.qty}
              </span>
              <span className="text-slate-900 font-semibold">{formatBRL(lineTotal)}</span>
            </div>
          ))}
          <div className="border-t border-purple-100 pt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold text-slate-900">{formatBRL(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Frete (Araguaína)</span>
              <span className="font-semibold text-slate-900">{formatBRL(shippingBRL)}</span>
            </div>
            {discountPreview > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Desconto (pontos)</span>
                <span className="font-semibold text-slate-900">- {formatBRL(discountPreview)}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 border-t border-purple-100">
              <span className="text-slate-600 font-semibold">Total</span>
              <span className="text-lg font-bold text-purple-700">{formatBRL(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
