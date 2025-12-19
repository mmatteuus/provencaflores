import { useLoyaltyStore } from '@/store/loyaltyStore'

export default function MyAccount() {
  const pointsBalance = useLoyaltyStore((s) => s.pointsBalance)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Minha conta</p>
        <h1 className="text-3xl font-semibold text-slate-900">Pontos & benefícios</h1>
        <p className="text-slate-500">Acompanhe seu saldo e use pontos para desconto (sem backend, por enquanto).</p>
      </header>

      <div className="bg-white rounded-3xl shadow-lg p-8">
        <p className="text-sm text-slate-500">Saldo de pontos</p>
        <p className="text-4xl font-bold text-purple-700 mt-2">{pointsBalance}</p>
        <p className="text-sm text-slate-500 mt-3">Dica: você ganha pontos ao finalizar um pedido.</p>
      </div>
    </div>
  )
}

