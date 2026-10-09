import { Module } from "@nestjs/common";
import { ShowtimeService } from "./showtime.service";
import { ShowtimeController } from "./showtime.controller";
import { ShowtimeRepository } from "./showtime.repository";
import { PrismaModule } from "src/database/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ShowtimeController],
  providers: [ShowtimeService, ShowtimeRepository],
})
export class ShowtimeModule {}
