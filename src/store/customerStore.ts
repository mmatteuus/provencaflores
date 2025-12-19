import { useSyncExternalStore } from 'react'

export type CustomerProfile = {
  name: string
  email: string
  phone: string
  address: string
  neighborhood: string
}

type CustomerState = {
  profile: CustomerProfile
}

type CustomerStore = CustomerState & {
  setProfile: (profile: Partial<CustomerProfile>) => void
  clear: () => void
}

const STORAGE_KEY = 'pf_customer_v1'

const EMPTY_PROFILE: CustomerProfile = {
  name: '',
  email: '',
  phone: '',
  address: '',
  neighborhood: 'Centro',
}

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

let state: CustomerState = loadInitialState()

function loadInitialState(): CustomerState {
  const storage = getStorage()
  const parsed = safeJsonParse<CustomerState>(storage?.getItem(STORAGE_KEY) ?? null)
  const profile = parsed?.profile && typeof parsed.profile === 'object' ? parsed.profile : EMPTY_PROFILE
  return {
    profile: {
      ...EMPTY_PROFILE,
      ...profile,
    },
  }
}

function persist(next: CustomerState) {
  state = next
  const storage = getStorage()
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
  listeners.forEach((listener) => listener())
}

function setProfile(profile: Partial<CustomerProfile>) {
  persist({ profile: { ...state.profile, ...profile } })
}

function clear() {
  persist({ profile: { ...EMPTY_PROFILE } })
}

const actions = { setProfile, clear } as const

export function customerStoreGetState(): CustomerStore {
  return { ...state, ...actions }
}

export function customerStoreSubscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useCustomerStore<T>(selector: (s: CustomerStore) => T): T {
  return useSyncExternalStore(
    customerStoreSubscribe,
    () => selector(customerStoreGetState()),
    () => selector(customerStoreGetState())
  )
}

