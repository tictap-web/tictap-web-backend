import { Body, Controller, Get, Post } from "@nestjs/common";
import { SeatService } from "./seat.service";
import { CreateSeatDto } from "./dto/create-seat.dto";

@Controller("seats")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  async createMany(@Body() createSeatDto: CreateSeatDto) {
    const data = await this.seatService.createMany(createSeatDto);
    return { message: "Seats created successfully", data };
  }

  @Get()
  async findAll() {
    const data = await this.seatService.findAll();
    return { message: "Seats fetched successfully", data };
  }
}