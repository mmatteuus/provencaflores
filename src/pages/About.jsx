import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-10 py-10">
      <section className="bg-white rounded-3xl shadow-xl p-8 space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Sobre nós</p>
        <h1 className="text-3xl font-semibold text-slate-900">Provença Flores, paixão por composições únicas</h1>
        <p className="text-slate-600">
          Com sede em São Paulo e time de floristas premiadas, a Provença Flores entrega arranjos afetivos desde 2011. Buscamos traduzir emoções por meio de texturas, cores e aromas, sempre priorizando o frescor.
        </p>
        <p className="text-slate-600">
          Trabalhamos com hortênsias, rosas, tulipas e foliagens sazonais importadas, além de oferecer projetos corporativos e assinaturas com atendimentos personalizados.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:underline">
          Entrar em contato
        </Link>
      </section>
      <section className="grid md:grid-cols-3 gap-6">
        {['Do campo ao atelier', 'Atendimento guiado', 'Entrega premium'].map((item) => (
          <div key={item} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 space-y-3 text-sm text-slate-600">
            <h3 className="text-lg font-semibold text-purple-700">{item}</h3>
            <p>Detalhes e cuidado em cada etapa para garantir experiências memoráveis.</p>
          </div>
        ))}
      </section>
    </div>
  )
}
