export interface PaymentGateway {
  createPaymentRequest(
    orderId: string,
    amount: number,
    idempotencyKey: string
  ): Promise<PaymentGatewayResponse>;
}

export interface PaymentGatewayResponse {
  paymentRequestId: string;
  transactionId?: string;
  paymentUrl?: string;
  status: string;
  actions: PaymentAction[];
}

export interface PaymentAction {
  type: string;
  descriptor: string;
  value: string;
}


