import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-10 py-10">
      <section className="bg-white rounded-3xl shadow-xl p-8 space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Sobre nós</p>
        <h1 className="text-3xl font-semibold text-slate-900">Provença Flores: carinho em cada detalhe</h1>
        <p className="text-slate-600">
          Somos uma floricultura com atendimento local e entrega em Araguaína/TO. Montamos arranjos e presentes pensando no
          momento de quem recebe: frescor, acabamento e mensagem personalizada.
        </p>
        <p className="text-slate-600">
          Trabalhamos com flores sazonais e opções de complementos (cartão, chocolate, pelúcia e vaso). Em caso de
          indisponibilidade, podemos substituir itens mantendo padrão, cor e valor.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:underline">
          Entrar em contato
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Do fornecedor à montagem', text: 'Seleção e preparo para manter frescor e beleza na entrega.' },
          { title: 'Atendimento guiado', text: 'Ajuda para escolher a melhor opção por ocasião e orçamento.' },
          { title: 'Entrega agendada', text: 'Entrega hoje (com cutoff) ou entrega programada por janela.' },
        ].map((item) => (
          <div key={item.title} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 space-y-3 text-sm text-slate-600">
            <h3 className="text-lg font-semibold text-purple-700">{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

