import { Test, TestingModule } from '@nestjs/testing';
import { TicketPriceController } from './ticket-price.controller';
import { TicketPriceService } from './ticket-price.service';

describe('TicketPriceController', () => {
  let controller: TicketPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketPriceController],
      providers: [TicketPriceService],
    }).compile();

    controller = module.get<TicketPriceController>(TicketPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
