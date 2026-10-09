import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    createPaymentDto: CreatePaymentDto,
    amount: number,
    idempotencyKey: string,
  ) {
    return await this.prisma.payment.create({
      data: {
        ...createPaymentDto,
        amount,
        idempotencyKey,
      },
    });
  }

  async update(
    id: string,
    data: {
      transactionId?: string;
      paymentRequestId?: string;
      paymentUrl?: string;
      status?: "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED";
    },
  ) {
    return await this.prisma.payment.update({
      where: { id },
      data,
    });
  }

  async findByOrderId(orderId: string) {
    return await this.prisma.payment.findFirst({
      where: { orderId },
    });
  }

  async findOneByPaymentRequestId(paymentRequestId: string) {
    return await this.prisma.payment.findFirst({
      where: { paymentRequestId },
      include: {
        order: true,
      },
    });
  }

  async markAsSuccess(
    paymentId: string,
    orderId: string,
    transactionId?: string,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.update({
        where: {
          id: paymentId,
        },
        data: {
          status: "SUCCESS",
          transactionId,
        },
      });

      const order = await tx.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "PAID",
        },
      });

      return {
        payment,
        order,
      };
    });
  }

 async markAsFailed(paymentId: string, orderId: string) {
  return this.prisma.$transaction(async (tx) => {
    const payment = await tx.payment.update({
      where: { id: paymentId },
      data: {
        status: "FAILED",
      },
    });

    const order = await tx.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED",
      },
    });

    return { payment, order };
  });
}

  async markAsExpired(paymentId: string, orderId: string) {
    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.update({
        where: {
          id: paymentId,
        },
        data: {
          status: "EXPIRED",
        },
      });

      const order = await tx.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "EXPIRED",
        },
      });

      return {
        payment,
        order,
      };
    });
  }

  findOneByIdempotencyKey(idempotencyKey: string) {
    return this.prisma.payment.findFirst({
      where: { idempotencyKey },
    });
  }
}
