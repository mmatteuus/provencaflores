import { useSyncExternalStore } from 'react'

type LoyaltyState = {
  pointsBalance: number
}

type LoyaltyStore = LoyaltyState & {
  earnPoints: (orderTotal: number) => number
  redeem: (points: number) => { pointsUsed: number; discountBRL: number }
  clear: () => void
}

const STORAGE_KEY = 'pf_loyalty_v1'
const POINTS_PER_REAL = 1

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

const listeners = new Set<() => void>()

let state: LoyaltyState = loadInitialState()

function loadInitialState(): LoyaltyState {
  const storage = getStorage()
  const parsed = safeJsonParse<LoyaltyState>(storage?.getItem(STORAGE_KEY) ?? null)
  const pointsBalance = Number(parsed?.pointsBalance ?? 0)
  return { pointsBalance: Number.isFinite(pointsBalance) && pointsBalance > 0 ? Math.floor(pointsBalance) : 0 }
}

function persist(next: LoyaltyState) {
  state = next
  const storage = getStorage()
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
  listeners.forEach((listener) => listener())
}

function earnPoints(orderTotal: number) {
  const total = Number(orderTotal)
  const earned = Number.isFinite(total) && total > 0 ? Math.floor(total * POINTS_PER_REAL) : 0
  persist({ pointsBalance: state.pointsBalance + earned })
  return earned
}

function redeem(points: number) {
  const requested = Math.floor(Number(points))
  if (!Number.isFinite(requested) || requested <= 0) {
    return { pointsUsed: 0, discountBRL: 0 }
  }
  const pointsUsed = Math.min(state.pointsBalance, requested)
  persist({ pointsBalance: state.pointsBalance - pointsUsed })
  return { pointsUsed, discountBRL: pointsUsed / POINTS_PER_REAL }
}

function clear() {
  persist({ pointsBalance: 0 })
}

const actions = { earnPoints, redeem, clear } as const

export function loyaltyStoreGetState(): LoyaltyStore {
  return { ...state, ...actions }
}

export function loyaltyStoreSubscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useLoyaltyStore<T>(selector: (s: LoyaltyStore) => T): T {
  return useSyncExternalStore(
    loyaltyStoreSubscribe,
    () => selector(loyaltyStoreGetState()),
    () => selector(loyaltyStoreGetState())
  )
}
