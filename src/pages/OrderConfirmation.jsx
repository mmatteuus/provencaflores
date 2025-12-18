import { Link } from 'react-router-dom'

export default function OrderConfirmation() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-lg p-10 text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Pedido confirmado</p>
        <h1 className="text-3xl font-semibold text-slate-900">Agradecemos pela compra!</h1>
        <p className="text-slate-500">
          Enviamos um e-mail com os detalhes do pedido. Nosso time irá preparar o arranjo com carinho e garantir a entrega no prazo combinado.
        </p>
        <div className="space-y-3 text-sm text-slate-500">
          <p>Pedido: #PRV-1248</p>
          <p>Entrega prevista em até 24h úteis</p>
          <p>Você pode acompanhar a entrega pelo link compartilhado por e-mail.</p>
        </div>
        <Link to="/catalog" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
          Ver mais arranjos
        </Link>
      </div>
    </div>
  )
}
