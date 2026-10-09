import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  BadRequestException,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { XenditWebhookDto } from "./dto/xendit-webhook-dto";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";

@Controller("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Session() session: UserSession,
    @Headers("idempotency-key") idempotencyKey: string,
  ) {
    if (!idempotencyKey) {
      throw new BadRequestException("Idempotency is required");
    }
    const data = await this.paymentService.create(
      session.user.id,
      createPaymentDto,
      idempotencyKey,
    );

    return {
      message: "Payment created successfully",
      data,
    };
  }

  @Post("webhook")
  async webhook(
    @Headers("x-callback-token") callbackToken: string,
    @Body() body: XenditWebhookDto,
  ) {
    const data = await this.paymentService.handleWebhook(callbackToken, body);

    return {
      message: "Webhook processed successfully",
      data,
    };
  }
}
