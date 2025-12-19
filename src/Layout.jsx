import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import AppFooter from '@/components/AppFooter'
import BackToTopFab from '@/components/BackToTopFab'

const navItems = [
  { label: 'Catálogo', to: createPageUrl('Catalog') },
  { label: 'Carrinho', to: createPageUrl('Cart') },
  { label: 'Minha conta', to: createPageUrl('Minha Conta') },
  { label: 'Contato', to: createPageUrl('Contact') },
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
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden rounded-lg p-2 border border-purple-100 text-purple-600 hover:bg-purple-50 transition"
              >
                <span className="sr-only">Abrir menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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

      <AppFooter />
      <BackToTopFab />
    </div>
  )
}

