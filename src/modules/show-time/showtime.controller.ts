import { Controller, Get, Post, Body, Param, HttpCode,  } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller("showtimes")
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createShowtimeDto: CreateShowtimeDto) {
    return this.showtimeService.create(createShowtimeDto);
  }

  @Get()
  @HttpCode(200)
  @AllowAnonymous()
  findAll() {
    return this.showtimeService.findAll();
  }

  @Get(":id")
  @HttpCode(200)
  @AllowAnonymous()
  findOne(@Param("id") id: string) {
    return this.showtimeService.findOne(id);
  }

  @Get(":id/seats")
  @AllowAnonymous()
  async getSeatMap(@Param("id") id: string) {
    const data = await this.showtimeService.getSeatMap(id);
    return { message: "Seat map fetched successfully", data };
  }
}
