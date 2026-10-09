import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { PrismaModule } from "src/database/prisma.module";
import { PaymentRepository } from "./payment.repository";
import { HttpModule } from "@nestjs/axios";
import { XenditModule } from "../xendit/xendit.module";
import { OrderModule } from "../order/order.module";

@Module({
  imports: [PrismaModule, HttpModule, XenditModule, OrderModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
