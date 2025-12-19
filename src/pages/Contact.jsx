export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-500">Contato</p>
        <h1 className="text-3xl font-semibold text-slate-900">Estamos aqui para ajudar</h1>
        <p className="text-slate-500">WhatsApp, telefone e e-mail. Resposta rápida em horário comercial.</p>
      </header>

      <div className="bg-white shadow-lg rounded-3xl p-8 grid md:grid-cols-2 gap-8">
        <form className="space-y-4">
          <label className="block space-y-1 text-sm text-slate-600">
            <span>Nome</span>
            <input
              type="text"
              placeholder="Seu nome completo"
              className="w-full px-4 py-3 border border-purple-100 rounded-2xl focus:border-purple-300 focus:outline-none"
            />
          </label>
          <label className="block space-y-1 text-sm text-slate-600">
            <span>E-mail</span>
            <input
              type="email"
              placeholder="voce@email.com"
              className="w-full px-4 py-3 border border-purple-100 rounded-2xl focus:border-purple-300 focus:outline-none"
            />
          </label>
          <label className="block space-y-1 text-sm text-slate-600">
            <span>Mensagem</span>
            <textarea
              rows="4"
              placeholder="Conte-nos sobre a ocasião e preferências…"
              className="w-full px-4 py-3 border border-purple-100 rounded-2xl focus:border-purple-300 focus:outline-none"
            />
          </label>
          <button type="button" className="px-6 py-3 w-full rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
            Enviar mensagem
          </button>
        </form>

        <div className="space-y-6 text-sm text-slate-500">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-purple-500">WhatsApp</p>
            <p className="text-lg text-slate-900">+55 (63) 9 9999-9999</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-purple-500">E-mail</p>
            <p className="text-lg text-slate-900">contato@provencaflores.com.br</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-purple-500">Cidade</p>
            <p className="text-lg text-slate-900">Araguaína/TO</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-purple-500">Horários</p>
            <p>Seg–Sex: 8h às 18h</p>
            <p>Sáb: 8h às 12h</p>
          </div>
        </div>
      </div>
    </div>
  )
}

