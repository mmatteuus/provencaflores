export type DeliveryWindow = {
  id: 'MANHA_9_12' | 'TARDE_13_18'
  label: string
  startHour: number
  endHour: number
}

export const DELIVERY_WINDOWS: DeliveryWindow[] = [
  { id: 'MANHA_9_12', label: 'Manhã (9–12)', startHour: 9, endHour: 12 },
  { id: 'TARDE_13_18', label: 'Tarde (13–18)', startHour: 13, endHour: 18 },
]

export const SAME_DAY_CUTOFF_HOUR = 15

type NeighborhoodRate = {
  neighborhood: string
  zone: 'CENTRO' | 'ZONA_1' | 'ZONA_2'
  fee: number
}

export const ARAGUAINA_RATES: NeighborhoodRate[] = [
  { neighborhood: 'Centro', zone: 'CENTRO', fee: 12.9 },
  { neighborhood: 'Setor Central', zone: 'CENTRO', fee: 12.9 },
  { neighborhood: 'Senador', zone: 'ZONA_1', fee: 16.9 },
  { neighborhood: 'São João', zone: 'ZONA_1', fee: 16.9 },
  { neighborhood: 'Araguaína Sul', zone: 'ZONA_2', fee: 19.9 },
  { neighborhood: 'Costa Esmeralda', zone: 'ZONA_2', fee: 19.9 },
]

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

export function estimateAraguainaShippingBRL(neighborhood: string): number {
  const key = normalize(neighborhood)
  const found = ARAGUAINA_RATES.find((rate) => normalize(rate.neighborhood) === key)
  if (found) return found.fee
  return 19.9
}

export function isSameDayStillAvailable(now = new Date()): boolean {
  return now.getHours() < SAME_DAY_CUTOFF_HOUR
}

export function getDefaultDeliveryDateISO(options: { sameDayEligible: boolean; now?: Date }): string {
  const now = options.now ?? new Date()
  const canSameDay = options.sameDayEligible && isSameDayStillAvailable(now)
  const date = new Date(now)
  if (!canSameDay) date.setDate(date.getDate() + 1)
  return date.toISOString().slice(0, 10)
}

