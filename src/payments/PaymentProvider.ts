export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED'

export type PaymentOrder = {
  id: string
  totalBRL: number
  customer: {
    name: string
    email: string
    phone?: string
  }
}

export type PixPayment = {
  qrCode: string
  copiaECola: string
  expiresAt: string
}

export type TokenizedCard = {
  cardToken: string
}

export type CardPaymentResult = {
  status: PaymentStatus
  providerReference?: string
}

export type CardForm = {
  holderName: string
  number: string
  expMonth: string
  expYear: string
  cvv: string
}

export interface PaymentProvider {
  createPixPayment(order: PaymentOrder): Promise<PixPayment>
  tokenizeCard(cardForm: CardForm): Promise<TokenizedCard>
  payWithCard(order: PaymentOrder, cardToken: string): Promise<CardPaymentResult>
}

