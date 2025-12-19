export type OrderPaymentMethod = 'STONE_LINK' | 'PIX' | 'CARD'

export type Order = {
  id: string
  createdAt: string
  customer: {
    name: string
    email: string
    phone: string
  }
  delivery: {
    address: string
    neighborhood: string
    date: string
    window: string
    notes: string
    shippingBRL: number
  }
  lines: Array<{
    productId: string
    variantId: string | null
    addons: Array<{ addonId: string; qty: number }>
    message: string
    qty: number
    unitPrice: number
    lineTotal: number
  }>
  totals: {
    subtotal: number
    shipping: number
    discount: number
    total: number
  }
  loyalty: {
    pointsEarned: number
    pointsUsed: number
  }
  payment: {
    method: OrderPaymentMethod
    status: 'PENDING' | 'PAID' | 'FAILED'
    reference?: string
  }
}

const STORAGE_KEY = 'pf_orders_v1'

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function createOrderId() {
  const suffix = Math.random().toString(16).slice(2, 6).toUpperCase()
  return `PRV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${suffix}`
}

export function getOrders(): Order[] {
  const parsed = safeJsonParse<{ orders: Order[] }>(localStorage.getItem(STORAGE_KEY))
  return Array.isArray(parsed?.orders) ? parsed.orders : []
}

export function getOrderById(orderId: string): Order | undefined {
  return getOrders().find((order) => order.id === orderId)
}

export function saveOrder(order: Omit<Order, 'id' | 'createdAt'> & Partial<Pick<Order, 'id' | 'createdAt'>>): Order {
  const orders = getOrders()
  const next: Order = {
    ...order,
    id: order.id ?? createOrderId(),
    createdAt: order.createdAt ?? new Date().toISOString(),
  } as Order
  const withoutCurrent = orders.filter((existing) => existing.id !== next.id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ orders: [next, ...withoutCurrent] }))
  return next
}
