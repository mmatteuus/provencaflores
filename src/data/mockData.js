/**
 * Base de catálogo (sem backend):
 * - `variants`: variações de tamanho/cor/embalagem
 * - `addons`: complementos comuns em floricultura
 * - `pointsEarn` / `pointsCost`: fidelidade e troca por pontos
 * - `delivery`: regras simples (hoje/agendamento/janela)
 */

export const addonsCatalog = [
  { id: 'CHOCOLATE', name: 'Chocolate', price: 24.9 },
  { id: 'VASO', name: 'Vaso', price: 39.9 },
  { id: 'PELUCIA', name: 'Pelúcia', price: 49.9 },
  { id: 'CARTAO', name: 'Cartão (com mensagem)', price: 9.9 },
]

function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

const rawProducts = [
  {
    id: 'ROSA-UNIT',
    name: 'Rosa unitária',
    category: 'Rosas',
    description: 'Rosa fresca com opção de embalagem e cor. Ideal para gesto rápido.',
    images: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'],
    featured: true,
    variants: [
      { id: 'SIMPLES', name: 'Simples', price: 14.9, attributes: { embalagem: 'sem' } },
      { id: 'EMBALADA', name: 'Na embalagem', price: 16.9, attributes: { embalagem: 'sim' } },
      { id: 'EMBALADA-VERMELHA', name: 'Embalagem vermelha', price: 18.9, attributes: { embalagem: 'vermelha' } },
    ],
    addons: ['CARTAO', 'CHOCOLATE', 'PELUCIA'],
    pointsEarn: 15,
    pointsCost: 120,
    delivery: { sameDayEligible: true, allowScheduling: true },
  },
  {
    id: 'RAMALHETE-ROSAS',
    name: 'Ramalhete de rosas',
    category: 'Buquês & Ramalhetes',
    description: 'Ramalhete clássico com variações de hastes. Frescor e elegância.',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'],
    featured: true,
    variants: [
      { id: '4', name: '4 rosas', price: 69.9, attributes: { hastes: 4 } },
      { id: '6', name: '6 rosas', price: 99.9, attributes: { hastes: 6 } },
      { id: '10', name: '10 rosas', price: 159.9, attributes: { hastes: 10 } },
      { id: '15', name: '15 rosas', price: 233.9, attributes: { hastes: 15 } },
    ],
    addons: ['CARTAO', 'VASO', 'CHOCOLATE'],
    pointsEarn: 99,
    pointsCost: 600,
    delivery: { sameDayEligible: true, allowScheduling: true },
  },
  {
    id: 'BUQUE-DELICADEZA',
    name: 'Buquê Delicadeza',
    category: 'Buquês & Ramalhetes',
    description: 'Buquê com mix delicado em tons suaves. Perfeito para aniversários e agradecimentos.',
    images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80'],
    featured: true,
    variants: [
      { id: 'P', name: 'Tamanho P', price: 85.9, attributes: { tamanho: 'P' } },
      { id: 'M', name: 'Tamanho M', price: 119.9, attributes: { tamanho: 'M' } },
      { id: 'G', name: 'Tamanho G', price: 159.9, attributes: { tamanho: 'G' } },
    ],
    addons: ['CARTAO', 'CHOCOLATE', 'VASO', 'PELUCIA'],
    pointsEarn: 120,
    pointsCost: 800,
    delivery: { sameDayEligible: true, allowScheduling: true },
  },
  {
    id: 'GIRASSOL',
    name: 'Girassóis com folhagem',
    category: 'Girassóis',
    description: 'Arranjo vibrante com girassóis e folhagens. Opções com 1 ou 5 unidades.',
    images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80'],
    featured: false,
    variants: [
      { id: '1', name: '1 girassol', price: 42.9, attributes: { girassois: 1 } },
      { id: '5', name: '5 girassóis', price: 153.9, attributes: { girassois: 5 } },
    ],
    addons: ['CARTAO', 'CHOCOLATE'],
    pointsEarn: 70,
    pointsCost: 500,
    delivery: { sameDayEligible: true, allowScheduling: true },
  },
  {
    id: 'ORQUIDEA-PHAL',
    name: 'Orquídea Phalaenopsis',
    category: 'Flores em Vaso',
    description: 'Orquídea Phalaenopsis em vaso, com opção de embalagem e cartão.',
    images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80'],
    featured: false,
    variants: [
      { id: 'BRANCA', name: 'Branca', price: 147.9, attributes: { cor: 'Branca' } },
      { id: 'ROSA', name: 'Rosa', price: 147.9, attributes: { cor: 'Rosa' } },
    ],
    addons: ['CARTAO', 'VASO'],
    pointsEarn: 148,
    pointsCost: 900,
    delivery: { sameDayEligible: false, allowScheduling: true },
  },
  {
    id: 'CESTA-CAFE',
    name: 'Cesta Café da manhã',
    category: 'Cestas & Kits',
    description:
      'Cesta completa com itens selecionados (sujeito à substituição por disponibilidade, mantendo padrão e valor).',
    images: ['https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80'],
    featured: false,
    variants: [
      { id: 'CLASSICA', name: 'Clássica', price: 212.9, attributes: { tamanho: 'Clássica' } },
      { id: 'ESPECIAL', name: 'Especial', price: 292.9, attributes: { tamanho: 'Especial' } },
    ],
    addons: ['CARTAO', 'PELUCIA', 'CHOCOLATE'],
    pointsEarn: 200,
    pointsCost: 1200,
    delivery: { sameDayEligible: true, allowScheduling: true },
  },
]

export const products = rawProducts.map((product) => {
  const priceFrom = Math.min(...product.variants.map((variant) => variant.price))
  return { ...product, slug: slugify(product.name), priceFrom }
})

const categorySet = new Set(products.map((product) => product.category))
export const categories = Array.from(categorySet).map((category) => ({
  id: slugify(category),
  name: category,
  description: `Seleção da categoria ${category} com curadoria dedicada.`,
  image: products.find((product) => product.category === category)?.images?.[0],
}))

export const featuredProducts = products.filter((product) => product.featured)

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

export function findProductBySlug(slug) {
  return products.find((product) => product.slug === slug)
}

export function findProductById(productId) {
  return products.find((product) => product.id === productId)
}

export function findAddonById(addonId) {
  return addonsCatalog.find((addon) => addon.id === addonId)
}

