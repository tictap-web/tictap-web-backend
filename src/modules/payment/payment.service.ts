import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PaymentRepository } from "./payment.repository";
import type { PaymentGateway } from "./interface/payment-gateaway-interface";
import {
  XenditPaymentStatus,
  XenditWebhookDto,
} from "./dto/xendit-webhook-dto";
import { OrderService } from "../order/order.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly orderService: OrderService,

    @Inject("PAYMENT_GATEWAY")
    private readonly paymentGateway: PaymentGateway,
  ) {}

  async create(
    userId: string,
    createPaymentDto: CreatePaymentDto,
    idempotencyKey: string,
  ) {
    const existingIdempotency =
      await this.paymentRepository.findOneByIdempotencyKey(idempotencyKey);

    if (existingIdempotency) {
      return existingIdempotency;
    }

    const order = await this.orderService.getMyOrder(
      userId,
      createPaymentDto.orderId,
    );

    if (order.status !== "PENDING") {
      throw new BadRequestException("Order is not available for payment");
    }
    if (order.expiresAt <= new Date()) {
      throw new BadRequestException("Order has expired");
    }

    const existingPayment =
      await this.paymentRepository.findOneByIdempotencyKey(idempotencyKey);

    if (existingPayment) {
      return existingPayment;
    }

    const amount = order.totalPrice;

    const payment = await this.paymentRepository.create(
      createPaymentDto,
      amount,
      idempotencyKey,
    );

    try {
      const result = await this.paymentGateway.createPaymentRequest(
        order.id,
        amount,
        idempotencyKey,
      );

      const updatedPayment = await this.paymentRepository.update(payment.id, {
        paymentRequestId: result.paymentRequestId,
        paymentUrl: result.paymentUrl,
        transactionId: result.transactionId,
      });

      return {
        paymentId: updatedPayment.id,
        orderId: updatedPayment.orderId,
        amount: updatedPayment.amount,
        status: updatedPayment.status,
        paymentRequestId: updatedPayment.paymentRequestId,
        paymentUrl: updatedPayment.paymentUrl,
        transactionId: updatedPayment.transactionId,
        idempotencyKey: updatedPayment.idempotencyKey,
        actions: result.actions,
      };
    } catch (error) {
      await this.paymentRepository.markAsFailed(payment.id, payment.orderId);

      throw error;
    }
  }

  async handleWebhook(callbackToken: string, body: XenditWebhookDto) {
    if (callbackToken !== process.env.XENDIT_WEBHOOK_TOKEN) {
      throw new UnauthorizedException("Invalid callback token");
    }

    const payment = await this.paymentRepository.findOneByPaymentRequestId(
      body.payment_request_id,
    );

    if (!payment) {
      throw new NotFoundException("Payment not found");
    }

    if (
      payment.status === "SUCCESS" ||
      payment.status === "FAILED" ||
      payment.status === "EXPIRED"
    ) {
      return {
        paymentId: payment.id,
        orderId: payment.orderId,
        status: payment.status,
      };
    }

    let result;

    switch (body.status) {
      case XenditPaymentStatus.SUCCEEDED:
        result = await this.paymentRepository.markAsSuccess(
          payment.id,
          payment.orderId,
          body.latest_payment_id,
        );
        break;

      case XenditPaymentStatus.FAILED:
        result = await this.paymentRepository.markAsFailed(
          payment.id,
          payment.orderId,
        );
        break;

      case XenditPaymentStatus.EXPIRED:
        result = await this.paymentRepository.markAsExpired(
          payment.id,
          payment.orderId,
        );
        break;

      default:
        throw new BadRequestException("Unsupported payment status");
    }

    return {
      paymentId: result.payment.id,
      orderId: result.order.id,
      status: result.payment.status,
    };
  }
}
