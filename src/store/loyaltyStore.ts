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
  const parsed = safeJsonParse<LoyaltyState>(localStorage.getItem(STORAGE_KEY))
  const pointsBalance = Number(parsed?.pointsBalance ?? 0)
  return { pointsBalance: Number.isFinite(pointsBalance) && pointsBalance > 0 ? Math.floor(pointsBalance) : 0 }
}

function persist(next: LoyaltyState) {
  state = next
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  listeners.forEach((listener) => listener())
}

export function loyaltyStoreGetState(): LoyaltyStore {
  return {
    ...state,
    earnPoints(orderTotal) {
      const total = Number(orderTotal)
      const earned = Number.isFinite(total) && total > 0 ? Math.floor(total * POINTS_PER_REAL) : 0
      persist({ pointsBalance: state.pointsBalance + earned })
      return earned
    },
    redeem(points) {
      const requested = Math.floor(Number(points))
      if (!Number.isFinite(requested) || requested <= 0) {
        return { pointsUsed: 0, discountBRL: 0 }
      }
      const pointsUsed = Math.min(state.pointsBalance, requested)
      persist({ pointsBalance: state.pointsBalance - pointsUsed })
      return { pointsUsed, discountBRL: pointsUsed / POINTS_PER_REAL }
    },
    clear() {
      persist({ pointsBalance: 0 })
    },
  }
}

export function loyaltyStoreSubscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useLoyaltyStore<T>(selector: (s: LoyaltyStore) => T): T {
  return useSyncExternalStore(loyaltyStoreSubscribe, () => selector(loyaltyStoreGetState()))
}

