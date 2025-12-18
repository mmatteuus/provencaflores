export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-500">Contato</p>
        <h1 className="text-3xl font-semibold text-slate-900">Estamos aqui para ajudar</h1>
        <p className="text-slate-500">Respostas rápidas em até 24h úteis, telefone, WhatsApp e e-mail.</p>
      </header>
      <div className="bg-white shadow-lg rounded-3xl p-8 grid md:grid-cols-2 gap-8">
        <form className="space-y-4">
          <label className="block space-y-1 text-sm text-slate-600">
            <span>Nome</span>
            <input type="text" placeholder="Seu nome completo" className="w-full px-4 py-3 border border-purple-100 rounded-2xl focus:border-purple-300 focus:outline-none" />
          </label>
          <label className="block space-y-1 text-sm text-slate-600">
            <span>E-mail</span>
            <input type="email" placeholder="voce@email.com" className="w-full px-4 py-3 border border-purple-100 rounded-2xl focus:border-purple-300 focus:outline-none" />
          </label>
          <label className="block space-y-1 text-sm text-slate-600">
            <span>Mensagem</span>
            <textarea rows="4" placeholder="Conte-nos sobre a sua celebração…" className="w-full px-4 py-3 border border-purple-100 rounded-2xl focus:border-purple-300 focus:outline-none" />
          </label>
          <button type="button" className="px-6 py-3 w-full rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
            Enviar mensagem
          </button>
        </form>
        <div className="space-y-6 text-sm text-slate-500">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-purple-500">Telefone</p>
            <p className="text-lg text-slate-900">+55 (11) 98765-4321</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-purple-500">WhatsApp</p>
            <p className="text-lg text-slate-900">+55 (11) 99999-1234</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-purple-500">Endereço</p>
            <p className="text-lg text-slate-900">Rua das Flores, 123 - Jardins, São Paulo/SP</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-purple-500">Horários</p>
            <p>Seg a Sex: 9h às 19h</p>
            <p>Sáb: 9h às 16h</p>
          </div>
        </div>
      </div>
    </div>
  )
}
