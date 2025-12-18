import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center space-y-6">
        <p className="text-6xl font-light text-purple-200">404</p>
        <h1 className="text-3xl font-semibold text-slate-800">Página não encontrada</h1>
        <p className="text-sm text-slate-500">
          A rota solicitada não existe nesta versão de demonstração. Volte para a home e continue explorando os arranjos.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full bg-purple-600 text-white hover:bg-purple-500 transition"
        >
          Voltar para Início
        </Link>
      </div>
    </div>
  )
}
