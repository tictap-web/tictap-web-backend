import { Module } from "@nestjs/common";
import { SeatService } from "./seat.service";
import { SeatController } from "./seat.controller";
import { SeatRepository } from "./seat.repository";
import { PrismaModule } from "src/database/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [SeatController],
  providers: [SeatService, SeatRepository],
})
export class SeatModule {}
