import { useSyncExternalStore } from 'react'

export type DeliveryWindow = 'MANHA_9_12' | 'TARDE_13_18'

export type CartAddonSelection = {
  addonId: string
  qty: number
}

export type CartLine = {
  lineId: string
  productId: string
  variantId: string | null
  addons: CartAddonSelection[]
  message: string
  deliveryDate: string | null
  deliveryWindow: DeliveryWindow | null
  qty: number
  addedAt: string
}

type CartState = {
  lines: CartLine[]
}

type CartStore = CartState & {
  addItem: (input: {
    productId: string
    variantId?: string | null
    addons?: CartAddonSelection[]
    message?: string
    deliveryDate?: string | null
    deliveryWindow?: DeliveryWindow | null
    qty?: number
  }) => string
  removeItem: (lineId: string) => void
  updateQty: (lineId: string, qty: number) => void
  clear: () => void
}

const STORAGE_KEY = 'pf_cart_v1'

function getStorage() {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null
  } catch {
    return null
  }
}

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function createLineId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `line_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

const listeners = new Set<() => void>()

let state: CartState = loadInitialStateSafe()

function loadInitialStateSafe(): CartState {
  const storage = getStorage()
  const parsed = safeJsonParse<CartState>(storage?.getItem(STORAGE_KEY) ?? null)
  if (!parsed?.lines || !Array.isArray(parsed.lines)) return { lines: [] }
  return {
    lines: parsed.lines.filter((line) => line && typeof line.lineId === 'string' && typeof line.productId === 'string'),
  }
}

function persist(next: CartState) {
  state = next
  const storage = getStorage()
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
  listeners.forEach((listener) => listener())
}

function addItem(input: {
  productId: string
  variantId?: string | null
  addons?: CartAddonSelection[]
  message?: string
  deliveryDate?: string | null
  deliveryWindow?: DeliveryWindow | null
  qty?: number
}): string {
  const qty = Math.max(1, Math.floor(input.qty ?? 1))
  const normalizedAddons = (input.addons ?? []).filter((addon) => addon && addon.qty > 0)
  const nextLine: CartLine = {
    lineId: createLineId(),
    productId: input.productId,
    variantId: input.variantId ?? null,
    addons: normalizedAddons,
    message: input.message ?? '',
    deliveryDate: input.deliveryDate ?? null,
    deliveryWindow: input.deliveryWindow ?? null,
    qty,
    addedAt: new Date().toISOString(),
  }

  persist({ lines: [nextLine, ...state.lines] })
  return nextLine.lineId
}

function removeItem(lineId: string) {
  persist({ lines: state.lines.filter((line) => line.lineId !== lineId) })
}

function updateQty(lineId: string, qty: number) {
  const normalizedQty = Math.max(1, Math.floor(qty))
  persist({
    lines: state.lines.map((line) => (line.lineId === lineId ? { ...line, qty: normalizedQty } : line)),
  })
}

function clear() {
  persist({ lines: [] })
}

const actions = { addItem, removeItem, updateQty, clear } as const

export function cartStoreGetState(): CartStore {
  return { ...state, ...actions }
}

export function cartStoreSubscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useCartStore<T>(selector: (s: CartStore) => T): T {
  return useSyncExternalStore(cartStoreSubscribe, () => selector(cartStoreGetState()), () => selector(cartStoreGetState()))
}
