import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCustomerStore } from '@/store/customerStore'
import { useLoyaltyStore } from '@/store/loyaltyStore'
import { getOrders } from '@/store/orderStore'

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function MyAccount() {
  const profile = useCustomerStore((s) => s.profile)
  const setProfile = useCustomerStore((s) => s.setProfile)

  const pointsBalance = useLoyaltyStore((s) => s.pointsBalance)

  const [tab, setTab] = useState('perfil')
  const [orders, setOrders] = useState([])

  const [form, setForm] = useState(() => ({ ...profile }))

  useEffect(() => {
    setForm({ ...profile })
  }, [profile])

  useEffect(() => {
    const refresh = () => setOrders(getOrders())
    refresh()
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [])

  const totalOrders = orders.length
  const lastOrder = orders[0]

  const summary = useMemo(() => {
    const totalSpent = orders.reduce((sum, order) => sum + Number(order?.totals?.total ?? 0), 0)
    return { totalSpent }
  }, [orders])

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Minha conta</p>
        <h1 className="text-3xl font-semibold text-slate-900">Painel do cliente</h1>
        <p className="text-slate-500">Perfil, pedidos e pontos.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-1">
          <p className="text-sm text-slate-500">Pontos</p>
          <p className="text-3xl font-bold text-purple-700">{pointsBalance}</p>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-1">
          <p className="text-sm text-slate-500">Pedidos</p>
          <p className="text-3xl font-bold text-slate-900">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-1">
          <p className="text-sm text-slate-500">Total gasto</p>
          <p className="text-3xl font-bold text-slate-900">{formatBRL(summary.totalSpent)}</p>
        </div>
      </div>

      {lastOrder && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-600">Último pedido</p>
            <p className="text-lg font-semibold text-slate-900">
              {lastOrder.id} · {formatBRL(lastOrder?.totals?.total ?? 0)}
            </p>
          </div>
          <Link
            to={`/pedido/${encodeURIComponent(lastOrder.id)}`}
            className="px-5 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
          >
            Ver pedido
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab('perfil')}
          className={`px-4 py-2 rounded-full text-sm font-semibold border ${
            tab === 'perfil' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-700 border-purple-100'
          }`}
        >
          Perfil
        </button>
        <button
          type="button"
          onClick={() => setTab('pedidos')}
          className={`px-4 py-2 rounded-full text-sm font-semibold border ${
            tab === 'pedidos' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-700 border-purple-100'
          }`}
        >
          Pedidos
        </button>
        <button
          type="button"
          onClick={() => setTab('pontos')}
          className={`px-4 py-2 rounded-full text-sm font-semibold border ${
            tab === 'pontos' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-700 border-purple-100'
          }`}
        >
          Pontos
        </button>
      </div>

      {tab === 'perfil' && (
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Seus dados</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block space-y-2 text-sm text-slate-600">
              <span>Nome</span>
              <input
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
              />
            </label>
            <label className="block space-y-2 text-sm text-slate-600">
              <span>E-mail</span>
              <input
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
              />
            </label>
            <label className="block space-y-2 text-sm text-slate-600">
              <span>WhatsApp</span>
              <input
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
              />
            </label>
            <label className="block space-y-2 text-sm text-slate-600">
              <span>Bairro (padrão)</span>
              <input
                value={form.neighborhood}
                onChange={(e) => setForm((prev) => ({ ...prev, neighborhood: e.target.value }))}
                className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
              />
            </label>
          </div>
          <label className="block space-y-2 text-sm text-slate-600">
            <span>Endereço (padrão)</span>
            <input
              value={form.address}
              onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
              className="w-full border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
            />
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setProfile(form)}
              className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
            >
              Salvar
            </button>
            <Link to="/checkout" className="text-sm font-semibold text-purple-700 hover:underline">
              Ir para checkout
            </Link>
          </div>
        </div>
      )}

      {tab === 'pedidos' && (
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Seus pedidos</h2>
          {orders.length === 0 ? (
            <div className="text-sm text-slate-500">
              Nenhum pedido ainda. <Link className="text-purple-700 hover:underline" to="/catalog">Ver catálogo</Link>
            </div>
          ) : (
            <div className="divide-y divide-purple-50">
              {orders.map((order) => (
                <div key={order.id} className="py-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{order.id}</p>
                    <p className="text-sm text-slate-500">
                      {new Date(order.createdAt).toLocaleString('pt-BR')} · {order?.payment?.status ?? '—'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-slate-900">{formatBRL(order?.totals?.total ?? 0)}</p>
                    <Link
                      to={`/pedido/${encodeURIComponent(order.id)}`}
                      className="px-4 py-2 rounded-full border border-purple-200 text-purple-700 font-semibold hover:bg-purple-50 transition"
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'pontos' && (
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Pontos</h2>
          <p className="text-sm text-slate-600">
            Saldo: <span className="font-semibold">{pointsBalance}</span> pontos
          </p>
          <p className="text-sm text-slate-500">Regra atual: 1 ponto = R$ 1,00 de desconto (mock).</p>
        </div>
      )}
    </div>
  )
}

