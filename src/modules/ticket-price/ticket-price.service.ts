import { Injectable } from '@nestjs/common';
import { CreateTicketPriceDto } from './dto/create-ticket-price.dto';
import { TicketPriceRepository } from './ticket-price.repository';

@Injectable()
export class TicketPriceService {
  constructor(private readonly ticketPriceRepository: TicketPriceRepository) {}
  create(createTicketPriceDto: CreateTicketPriceDto) {
    return this.ticketPriceRepository.create(createTicketPriceDto);
  }

  findAll() {
    return this.ticketPriceRepository.findAll();
  }
}
