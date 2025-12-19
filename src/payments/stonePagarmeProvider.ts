import type { CardForm, CardPaymentResult, PaymentOrder, PaymentProvider, PixPayment, TokenizedCard } from './PaymentProvider'

type StonePagarmeProviderConfig = {
  /**
   * Fase 1: usar Link de Pagamento (redirecionamento).
   * Fase 2: implementar checkout transparente (necessita camada segura).
   */
  paymentLinkUrl?: string
}

export function createStonePagarmeProvider(config: StonePagarmeProviderConfig = {}): PaymentProvider & { paymentLinkUrl?: string } {
  return {
    paymentLinkUrl: config.paymentLinkUrl,
    async createPixPayment(order: PaymentOrder): Promise<PixPayment> {
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()
      return {
        qrCode: `MOCK_QR_${order.id}`,
        copiaECola: `00020101021226830014BR.GOV.BCB.PIX2563mock/${order.id}5204000053039865802BR5920PROVENCA FLORES6009ARAGUAINA62070503***6304ABCD`,
        expiresAt,
      }
    },
    async tokenizeCard(cardForm: CardForm): Promise<TokenizedCard> {
      const last4 = cardForm.number.replace(/\D/g, '').slice(-4).padStart(4, '0')
      return { cardToken: `mock_card_${last4}_${Date.now()}` }
    },
    async payWithCard(_order: PaymentOrder, _cardToken: string): Promise<CardPaymentResult> {
      return { status: 'PAID', providerReference: `mock_charge_${Date.now()}` }
    },
  }
}

