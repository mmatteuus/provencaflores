import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import { Settings } from 'lucide-react'

const navItems = [
  { label: 'Início', to: '/' },
  { label: 'Catálogo', to: createPageUrl('Catalog') },
  { label: 'Sobre', to: createPageUrl('About') },
  { label: 'Contato', to: createPageUrl('Contact') },
  { label: 'Carrinho', to: createPageUrl('Cart') },
]

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">P</span>
              </div>
              <div>
                <p className="text-xl font-semibold text-purple-800">Provença Flores</p>
                <p className="text-xs text-purple-500 uppercase tracking-wide">Flores & Arranjos</p>
              </div>
            </Link>

            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm font-medium text-slate-700 hover:text-purple-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to={createPageUrl('Profiles')}
                className="hidden md:inline-flex items-center justify-center h-10 w-10 rounded-full bg-purple-50 text-purple-600 border border-purple-100 hover:bg-purple-100 transition"
                aria-label="Perfis disponíveis"
              >
                <Settings className="h-5 w-5" />
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden rounded-lg p-2 border border-purple-100 text-purple-600 hover:bg-purple-50 transition"
              >
                <span className="sr-only">Abrir menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={`${item.label}-mobile`}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-purple-50 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="pt-8">{children}</main>

      <footer className="mt-16 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Provença Flores</h3>
            <p className="text-sm text-purple-200">
              Arranjos autorais, coleções especiais e atendimento dedicado para celebrar momentos inesquecíveis.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-purple-200 mb-3">Horários</h4>
            <p className="text-sm text-purple-100">Seg-Sex: 9h às 19h</p>
            <p className="text-sm text-purple-100">Sáb: 9h às 16h</p>
            <p className="text-sm text-purple-100">Dom: 9h às 13h</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-purple-200 mb-3">Contato</h4>
            <p className="text-sm text-purple-100">(11) 98765-4321</p>
            <p className="text-sm text-purple-100">contato@provencaflores.com.br</p>
            <p className="text-sm text-purple-100">Rua das Flores, 123 - São Paulo/SP</p>
          </div>
        </div>
        <div className="border-t border-purple-800 py-4 text-center text-xs text-purple-200">
          © 2025 Provença Flores. Feito com carinho para os amantes de flores.
        </div>
      </footer>
    </div>
  )
}
