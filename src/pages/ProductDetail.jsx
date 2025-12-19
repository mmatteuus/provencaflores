import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addonsCatalog, findProductBySlug } from '@/data/mockData'
import { toast } from '@/components/ui/use-toast'
import { useCartStore } from '@/store/cartStore'
import DeliveryScheduler from '@/components/DeliveryScheduler'

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = findProductBySlug(slug)

  const addItem = useCartStore((s) => s.addItem)

  const [variantId, setVariantId] = useState(() => product?.variants?.[0]?.id ?? null)
  const [selectedAddons, setSelectedAddons] = useState(() => [])
  const [message, setMessage] = useState('')
  const [deliveryDate, setDeliveryDate] = useState(null)
  const [deliveryWindow, setDeliveryWindow] = useState(null)
  const [qty, setQty] = useState(1)

  const addonOptions = useMemo(() => {
    if (!product) return []
    return addonsCatalog.filter((addon) => product.addons.includes(addon.id))
  }, [product])

  const selectedVariant = useMemo(() => {
    if (!product) return null
    return product.variants.find((variant) => variant.id === variantId) ?? product.variants[0]
  }, [product, variantId])

  const unitPrice = useMemo(() => {
    const base = selectedVariant?.price ?? 0
    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = addonsCatalog.find((a) => a.id === addonId)
      return sum + (addon?.price ?? 0)
    }, 0)
    return base + addonsTotal
  }, [selectedVariant, selectedAddons])

  const jsonLd = useMemo(() => {
    if (!product) return null
    const offerPrice = selectedVariant?.price ?? product.priceFrom
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.images,
      sku: product.id,
      brand: { '@type': 'Brand', name: 'Provença Flores' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'BRL',
        price: String(offerPrice),
        availability: 'https://schema.org/InStock',
        url: typeof window !== 'undefined' ? window.location.href : undefined,
      },
    }
  }, [product, selectedVariant])

  useEffect(() => {
    if (!product) return

    const title = `${product.name} | Provença Flores`
    document.title = title

    const description = product.description

    function upsertMeta(selector, attrs) {
      let tag = document.head.querySelector(selector)
      if (!tag) {
        tag = document.createElement('meta')
        document.head.appendChild(tag)
      }
      Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, String(value)))
    }

    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    if (product.images?.[0]) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image', content: product.images[0] })
    }
  }, [product])

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
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}

      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.5em] text-purple-500">{product.category}</p>
          <h1 className="text-4xl font-semibold text-slate-900">{product.name}</h1>

          <div className="flex items-baseline gap-3">
            <p className="text-2xl font-bold text-purple-600">{formatBRL(selectedVariant?.price ?? product.priceFrom)}</p>
            <p className="text-sm text-slate-500">a partir de {formatBRL(product.priceFrom)}</p>
          </div>

          <p className="text-slate-600 text-lg">{product.description}</p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Variação</p>
            <select
              value={variantId ?? ''}
              onChange={(e) => setVariantId(e.target.value)}
              className="w-full bg-white border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name} — {formatBRL(variant.price)}
                </option>
              ))}
            </select>
          </div>

          {addonOptions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-900">Complementos</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {addonOptions.map((addon) => {
                  const checked = selectedAddons.includes(addon.id)
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${
                        checked ? 'border-purple-400 bg-purple-50' : 'border-purple-100 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setSelectedAddons((prev) => (checked ? prev.filter((id) => id !== addon.id) : [...prev, addon.id]))
                        }
                      />
                      <span className="flex-1 text-sm text-slate-800">{addon.name}</span>
                      <span className="text-sm font-semibold text-purple-700">{formatBRL(addon.price)}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Mensagem no cartão (opcional)</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-white border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
              placeholder="Ex.: Feliz aniversário! Com carinho…"
            />
            <p className="text-xs text-slate-500">Padrão floricultura: pode haver substituição de itens por disponibilidade mantendo valor e estilo.</p>
          </div>

          <DeliveryScheduler
            sameDayEligible={Boolean(product.delivery?.sameDayEligible)}
            value={{ deliveryDate, deliveryWindow }}
            onChange={(next) => {
              setDeliveryDate(next.deliveryDate)
              setDeliveryWindow(next.deliveryWindow)
            }}
          />

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Qtd</span>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-20 bg-white border border-purple-100 rounded-2xl px-3 py-2 focus:border-purple-300 focus:outline-none"
              />
            </label>
            <div className="ml-auto text-right">
              <p className="text-xs text-slate-500">Subtotal</p>
              <p className="text-lg font-bold text-slate-900">{formatBRL(unitPrice * Math.max(1, qty))}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                const lineId = addItem({
                  productId: product.id,
                  variantId: selectedVariant?.id ?? null,
                  addons: selectedAddons.map((addonId) => ({ addonId, qty: 1 })),
                  message,
                  deliveryDate,
                  deliveryWindow,
                  qty,
                })
                toast({ title: 'Adicionado ao carrinho', description: `Item ${lineId.slice(0, 8)}…` })
                navigate('/cart')
              }}
              className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
            >
              Adicionar ao carrinho
            </button>
            <Link to="/checkout" className="px-6 py-3 rounded-full border border-purple-200 text-purple-600 font-semibold hover:bg-purple-50 transition">
              Ir para checkout
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Experiência Provença</h2>
        <p className="text-sm text-slate-500">
          Cada composição passa por revisão e embalagem personalizada. Itens podem ser substituídos por disponibilidade, mantendo padrão e valor.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-500">
          <div className="space-y-1">
            <p className="font-semibold text-slate-900">Entrega</p>
            <p>Hoje (com cutoff) ou agendada.</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-slate-900">Complementos</p>
            <p>Cartão, chocolate, vaso e mais.</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-slate-900">Pontos</p>
            <p>Ganhe e use descontos.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
