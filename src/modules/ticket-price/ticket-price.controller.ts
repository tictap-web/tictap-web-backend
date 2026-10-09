import { Controller, Get, Post, Body, HttpCode } from "@nestjs/common";
import { TicketPriceService } from "./ticket-price.service";
import { CreateTicketPriceDto } from "./dto/create-ticket-price.dto";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";

@Controller("ticket-prices")
export class TicketPriceController {
  constructor(private readonly ticketPriceService: TicketPriceService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTicketPriceDto: CreateTicketPriceDto) {
    const ticketPrice = this.ticketPriceService.create(createTicketPriceDto);

    return {
      message: "Ticket price created successfully",
      data: ticketPrice,
    };
  }

  @Get()
  @HttpCode(200)
  @AllowAnonymous()
  findAll() {
    const ticketPrices = this.ticketPriceService.findAll();

    return {
      message: "Ticket prices retrieved successfully",
      data: ticketPrices,
    };
  }
}
