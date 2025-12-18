const rawProducts = [
  {
    sku: 'ROSA-UNIT-SIMP',
    title: 'Rosa Unitária Simples',
    category: 'Rosas',
    price: 14.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'ROSA-UNIT-EMB',
    title: 'Rosa Unitária na Embalagem',
    category: 'Rosas',
    price: 16.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'LOVE-LETTER',
    title: 'Love Letter (flor + envelope)',
    category: 'Presentes & Devocionais',
    price: 39.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'BUQ-UNICA',
    title: 'Buquê Única',
    category: 'Buquês & Ramalhetes',
    price: 42.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'BUQ-DELICADEZA',
    title: 'Buquê Delicadeza',
    category: 'Buquês & Ramalhetes',
    price: 85.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'RAM-4R',
    title: 'Mini Ramalhete - 4 Rosas',
    category: 'Buquês & Ramalhetes',
    price: 69.9,
    availability: 'InStock',
    attributes: { hastes: '4' },
  },
  {
    sku: 'RAM-6R',
    title: 'Mini Ramalhete - 6 Rosas',
    category: 'Buquês & Ramalhetes',
    price: 99.9,
    availability: 'InStock',
    attributes: { hastes: '6' },
  },
  {
    sku: 'RAM-10R',
    title: 'Ramalhete - 10 Rosas',
    category: 'Buquês & Ramalhetes',
    price: 159.9,
    availability: 'InStock',
    attributes: { hastes: '10' },
  },
  {
    sku: 'RAM-15R',
    title: 'Ramalhete - 15 Rosas',
    category: 'Buquês & Ramalhetes',
    price: 233.9,
    availability: 'InStock',
    attributes: { hastes: '15' },
  },
  {
    sku: 'BUQ-ROSAS-6',
    title: 'Buquê Tradicional só Rosas - 6 Unidades',
    category: 'Buquês & Ramalhetes',
    price: 148.9,
    availability: 'InStock',
    attributes: { hastes: '6' },
  },
  {
    sku: 'BUQ-ROSAS-12',
    title: 'Buquê Tradicional só Rosas - 12 Unidades',
    category: 'Buquês & Ramalhetes',
    price: 269.9,
    availability: 'InStock',
    attributes: { hastes: '12' },
  },
  {
    sku: 'BUQ-ROSAS-18',
    title: 'Buquê Tradicional só Rosas - 18 Unidades',
    category: 'Buquês & Ramalhetes',
    price: 314.9,
    availability: 'InStock',
    attributes: { hastes: '18' },
  },
  {
    sku: 'BUQ-ROSAS-24',
    title: 'Buquê Tradicional só Rosas - 24 Unidades',
    category: 'Buquês & Ramalhetes',
    price: 419.9,
    availability: 'InStock',
    attributes: { hastes: '24' },
  },
  {
    sku: 'MIX-GIR-ROS',
    title: 'Mix de Girassol com Rosas',
    category: 'Girassóis',
    price: 85.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'GIR-5',
    title: '5 Girassóis com Folhagem',
    category: 'Girassóis',
    price: 153.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'GIR-1',
    title: 'Girassol com Folhagem',
    category: 'Girassóis',
    price: 42.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'BOX-LOVE',
    title: 'Bloom Box Love',
    category: 'Bloom / Letter Box',
    price: 399.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'BOX-ROSAS',
    title: 'Bloom Box Rosas',
    category: 'Bloom / Letter Box',
    price: 283.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'BOX-MIX',
    title: 'Bloom Box Mix de Flores',
    category: 'Bloom / Letter Box',
    price: 212.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'BOX-LETTER-SANTA',
    title: 'Bloom Box Letter com Santa',
    category: 'Bloom / Letter Box',
    price: 179.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'VASO-MINI-CALANDIVA-PT06',
    title: 'Mini Calandiva pt 06',
    category: 'Flores em Vaso',
    price: 10.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'VASO-MINI-CACTUS-PT06',
    title: 'Mini Cactus pt 06',
    category: 'Flores em Vaso',
    price: 10.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'VASO-KALANCHOE-PT11',
    title: 'Kalanchoe pt 11',
    category: 'Flores em Vaso',
    price: 23.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'VASO-LIRIO',
    title: 'Lírio',
    category: 'Flores em Vaso',
    price: 97.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'VASO-ORQ-PHAL',
    title: 'Orquídea Phalaenopsis',
    category: 'Flores em Vaso',
    price: 147.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'VASO-ORQ-BABY',
    title: 'Orquídea Baby',
    category: 'Flores em Vaso',
    price: 97.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'VASO-BEG-PT15',
    title: 'Begônia pt 15',
    category: 'Flores em Vaso',
    price: 89.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'VASO-BEG-PT11',
    title: 'Begônia pt 11',
    category: 'Flores em Vaso',
    price: 54.9,
    availability: 'InStock',
    attributes: {},
  },
  {
    sku: 'CESTA-CAFE-ESPECIAL',
    title: 'Cesta Café da Manhã Especial',
    category: 'Cestas & Kits',
    price: 292.9,
    availability: 'InStock',
    attributes: {
      includes: [
        'Pães 100g',
        'Rosquinhas 100g',
        'Patê 100g',
        'Presunto 100g',
        'Muçarela 100g',
        'Bolo caseirinho',
        'Torradas',
        'Suco',
        'Iogurte',
        'Achocolatado',
        'Nutella 140g',
        'Uva',
        'Maçã red',
        'Pera',
        '2 bombons',
        'Caneca',
        'Talheres descartáveis',
        'Cone de flor',
      ],
    },
  },
]

const categoryImages = {
  Rosas: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
  'Buquês & Ramalhetes': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  Girassóis: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  'Bloom / Letter Box': 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  'Flores em Vaso': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  'Cestas & Kits': 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80',
  'Presentes & Devocionais': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
}

const defaultImage = 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80'

export const products = rawProducts.map((product, index) => {
  const slug = product.sku.toLowerCase()
  const details = Object.entries(product.attributes).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}: ${value.join(', ')}`
    }
    return `${key}: ${value}`
  })
  return {
    id: product.sku,
    slug,
    name: product.title,
    category: product.category,
    price: product.price,
    availability: product.availability,
    description: product.title,
    tagline: product.title,
    images: [categoryImages[product.category] || defaultImage],
    featured: index < 6,
    details: details.length > 0 ? details : ['Seleção Provença Flores'],
  }
})

const categorySet = new Set(products.map((product) => product.category))
export const categories = Array.from(categorySet).map((category) => ({
  id: category,
  name: category,
  description: `Seleção da categoria ${category} com arranjos frescos e curadoria dedicada.`,
  image: categoryImages[category] || defaultImage,
}))

export const featuredProducts = products.filter((product) => product.featured)

export const cartItems = [
  {
    productId: 'ROSA-UNIT-SIMP',
    quantity: 2,
  },
  {
    productId: 'BUQ-DELICADEZA',
    quantity: 1,
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
