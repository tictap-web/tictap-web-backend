import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "./lib/auth";
import { AuthController } from "./auth/auth.controller";
import { PrismaModule } from "./database/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { MovieModule } from "./modules/movie/movie.module";
import { CinemaModule } from "./modules/cinema/cinema.module";
import { TheaterModule } from "./modules/theater/theater.module";
import { TicketPriceModule } from "./modules/ticket-price/ticket-price.module";
import { SeatModule } from "./modules/seat/seat.module";
import { ShowtimeModule } from "./modules/show-time/showtime.module";
import { OrderModule } from "./modules/order/order.module";
import { PaymentModule } from "./modules/payment/payment.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule.forRoot({ auth }),
    ScheduleModule.forRoot(),
    PrismaModule,
    MovieModule,
    CinemaModule,
    TheaterModule,
    TicketPriceModule,
    SeatModule,
    ShowtimeModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
