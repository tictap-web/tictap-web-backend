import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import {
  PaymentGateway,
  PaymentGatewayResponse,
} from "../payment/interface/payment-gateaway-interface";

@Injectable()
export class XenditService implements PaymentGateway {
  constructor(private readonly httpService: HttpService) {}

  async createPaymentRequest(
    orderId: string,
    amount: number,
    idempotencyKey: string,
  ): Promise<PaymentGatewayResponse> {
    const response = await this.httpService.axiosRef.post(
      "https://api.xendit.co/v3/payment_requests",
      {
        reference_id: orderId,
        type: "PAY",
        country: "ID",
        currency: "IDR",
        request_amount: amount,
        channel_code: "QRIS",
      },
      {
        auth: {
          username: process.env.XENDIT_SECRET_KEY!,
          password: "",
        },
        headers: {
          "api-version": "2024-11-11",
          "idempotency-key": idempotencyKey,
        },
      },
    );

    const data = response.data;

    const paymentUrl = data.actions?.find(
      (action: any) =>
        action.descriptor === "WEB_URL" || action.descriptor === "DEEPLINK_URL",
    )?.value;

    return {
      paymentRequestId: data.payment_request_id,
      transactionId: data.latest_payment_id,
      paymentUrl,
      status: data.status,
      actions: data.actions ?? [],
    };
  }
}
