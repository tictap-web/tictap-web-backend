import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { XenditService } from "./xendit.service";
import { PrismaModule } from "src/database/prisma.module";

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [
    XenditService,
    {
      provide: "PAYMENT_GATEWAY",
      useExisting: XenditService,
    },
  ],
  exports: ["PAYMENT_GATEWAY"],
})
export class XenditModule {}
