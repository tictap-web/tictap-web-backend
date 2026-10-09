import { Test, TestingModule } from '@nestjs/testing';
import { TicketPriceService } from './ticket-price.service';

describe('TicketPriceService', () => {
  let service: TicketPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketPriceService],
    }).compile();

    service = module.get<TicketPriceService>(TicketPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
