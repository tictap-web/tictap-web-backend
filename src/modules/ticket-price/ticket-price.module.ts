import { Module } from '@nestjs/common';
import { TicketPriceService } from './ticket-price.service';
import { TicketPriceController } from './ticket-price.controller';
import { TicketPriceRepository } from './ticket-price.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TicketPriceController],
  providers: [TicketPriceService, TicketPriceRepository],
})
export class TicketPriceModule {}
