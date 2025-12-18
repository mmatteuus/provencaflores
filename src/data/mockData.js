export const categories = [
  {
    id: 'bouquets',
    name: 'Bouquets',
    description: 'Coleção romântica com rosas, lírios e folhagens especiais.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'arranjos',
    name: 'Arranjos para Evento',
    description: 'Centro de mesa e decorações sob medida para eventos e casamentos.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'presentes',
    name: 'Presentes',
    description: 'Cestas, combo de mini arranjos e kits de bem-estar para presentear.',
    image: 'https://images.unsplash.com/photo-1453838956703-c5ee0e5d4f5f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'corporativo',
    name: 'Projetos Corporativos',
    description: 'Assinaturas mensais e ambientação para escritórios premium.',
    image: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=800&q=80',
  },
]

export const products = [
  {
    id: 'box-de-rosas',
    name: 'Box de Rosas Provence',
    slug: 'box-de-rosas-provence',
    price: 149.0,
    category: 'bouquets',
    featured: true,
    tagline: 'Rosas vermelhas e folhagens exóticas',
    description: 'Caixa premium com 18 rosas colombianas e acabamento em veludo.',
    images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80'],
    details: ['Rosas colombianas', 'Embalagem artesanal', 'Entrega expressa'],
  },
  {
    id: 'arranjo-luar',
    name: 'Arranjo Luar Azul',
    slug: 'arranjo-luar-azul',
    price: 189.0,
    category: 'arranjos',
    featured: true,
    tagline: 'Buquê alto com orquídeas e rosas azuis',
    description: 'Estrutura elevada perfeita para mesas de cerimônia e recepções.',
    images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80'],
    details: ['Base de madeira', 'Orquídeas premium', 'Flores em tons de azul'],
  },
  {
    id: 'kit-mimos',
    name: 'Kit Mimos Aromáticos',
    slug: 'kit-mimos-aromaticos',
    price: 89.0,
    category: 'presentes',
    featured: false,
    tagline: 'Arranjo + vela + sabonete artesanal',
    description: 'Refrescante e delicado para presentear no mesmo dia.',
    images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80'],
    details: ['Vela perfumada', 'Sabonete natural', 'Cartão personalizado'],
  },
  {
    id: 'assinatura-mensal',
    name: 'Assinatura Mensal',
    slug: 'assinatura-mensal',
    price: 199.0,
    category: 'corporativo',
    featured: true,
    tagline: 'Flores frescas em escritórios e recepções',
    description: 'Seleção sazonal enviada toda segunda semana do mês.',
    images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80'],
    details: ['Gestão de entregas', 'Troca ilimitada', 'Consultoria de cores'],
  },
  {
    id: 'buque-pink',
    name: 'Buquê Pink Velvet',
    slug: 'buque-pink-velvet',
    price: 129.0,
    category: 'bouquets',
    featured: false,
    tagline: 'Tulipas, hortênsias e rosas rosadas',
    description: 'Buquê delicado com papel kraft texturizado e fita de cetim.',
    images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80'],
    details: ['Tulipas premium', 'Packaging artesanal', 'Entrega no mesmo dia'],
  },
  {
    id: 'arranjo-solsticio',
    name: 'Arranjo Solstício',
    slug: 'arranjo-solsticio',
    price: 169.0,
    category: 'arranjos',
    featured: false,
    tagline: 'Flores silvestres em tons terrosos',
    description: 'Design orgânico inspirado nas paisagens do interior.',
    images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80'],
    details: ['Folhagens secas', 'Elementos naturais', 'Base em cerâmica'],
  },
]

export const featuredProducts = products.filter((product) => product.featured)

export const cartItems = [
  {
    productId: 'box-de-rosas',
    quantity: 1,
  },
  {
    productId: 'kit-mimos',
    quantity: 2,
  },
]

export const testimonials = [
  {
    id: 'debora',
    quote: 'O arranjo para o meu casamento superou todas as expectativas. Atendimento impecável.',
    author: 'Débora Monteiro',
  },
  {
    id: 'vitor',
    quote: 'Assinatura mensal deixa a recepção do escritório sempre recebendo elogios.',
    author: 'Vitor Andrade',
  },
]
