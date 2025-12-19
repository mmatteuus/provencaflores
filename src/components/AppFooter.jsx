export default function AppFooter() {
  return (
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
          <p className="text-sm text-purple-100">Seg–Sex: 8h às 18h</p>
          <p className="text-sm text-purple-100">Sáb: 8h às 12h</p>
          <p className="text-sm text-purple-100">Dom: fechado</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-purple-200 mb-3">Contato</h4>
          <p className="text-sm text-purple-100">WhatsApp: (63) 9 9999-9999</p>
          <p className="text-sm text-purple-100">contato@provencaflores.com.br</p>
          <p className="text-sm text-purple-100">Araguaína/TO</p>
        </div>
      </div>
      <div className="border-t border-purple-800 py-4 text-center text-xs text-purple-200">
        <span>© {new Date().getFullYear()} Provença Flores.</span>{' '}
        <a
          href="https://mtsferreira.dev"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-white"
        >
          Desenvolvido por MtsFerreira
        </a>
      </div>
    </footer>
  )
}

