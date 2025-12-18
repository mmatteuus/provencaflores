const profileTypes = [
  {
    id: 'cliente',
    name: 'Cliente',
    description: 'Compras únicas, assinaturas mensais ou presentes personalizados.',
  },
  {
    id: 'corporativo',
    name: 'Corporativo',
    description: 'Assinaturas para recepções, ambientações e eventos corporativos.',
  },
  {
    id: 'revendedor',
    name: 'Revendedor',
    description: 'Parceria para revender produtos Provença em sua loja física ou online.',
  },
  {
    id: 'designer',
    name: 'Designer de interiores',
    description: 'Projetos conjuntos para ambientação de residências e espaços comerciais.',
  },
]

export default function Profiles() {
  return (
    <div className="min-h-[80vh] max-w-5xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.5em] text-purple-500">Perfis</p>
        <h1 className="text-3xl font-semibold text-slate-900">Escolha o perfil que descreve você</h1>
        <p className="text-slate-500">
          Cada perfil recebe atendimento dedicado, coleções e benefícios específicos sem necessidade de login. Clique no botão desejado e saiba mais.
        </p>
      </header>
      <div className="grid sm:grid-cols-2 gap-6">
        {profileTypes.map((profile) => (
          <div key={profile.id} className="flex flex-col rounded-3xl shadow-lg bg-white p-6 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-purple-400">{profile.id}</p>
              <h2 className="text-2xl font-semibold text-slate-900">{profile.name}</h2>
            </div>
            <p className="text-sm text-slate-500 flex-1">{profile.description}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`#${profile.id}`}
                className="px-5 py-3 rounded-full border border-purple-200 text-sm font-semibold text-purple-600 hover:bg-purple-50 transition"
              >
                Ver benefícios
              </a>
              <button
                type="button"
                onClick={() => alert(`${profile.name} selecionado`)}
                className="px-5 py-3 rounded-full bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition"
              >
                Entrar em contato
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-purple-50 rounded-3xl shadow-inner p-8 space-y-4">
        <h3 className="text-xl font-semibold text-purple-700">Precisa de ajuda?</h3>
        <p className="text-sm text-purple-600">
          Fale com nossa equipe de curadoria para entender qual perfil faz mais sentido, mesmo sem login. Envie uma mensagem via WhatsApp ou e-mail e enviaremos um guia personalizado.
        </p>
      </div>
    </div>
  )
}
