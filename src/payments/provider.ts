import { createStonePagarmeProvider } from './stonePagarmeProvider'

export const paymentProvider = createStonePagarmeProvider({
  paymentLinkUrl: import.meta.env.VITE_STONE_PAYMENT_LINK_URL,
})

