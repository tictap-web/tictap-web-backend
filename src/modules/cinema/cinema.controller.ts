import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { CinemaService } from "./cinema.service";
import { CreateCinemaDto } from "./dto/create-cinema.dto";
import { UpdateCinemaDto } from "./dto/update-cinema.dto";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";

@Controller("cinemas")
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemaService.create(createCinemaDto);
  }

  @Get()
  @HttpCode(200)
  @AllowAnonymous()
  findAll() {
    return this.cinemaService.findAll();
  }

  @Get(":id")
  @HttpCode(200)
  @AllowAnonymous()
  findOne(@Param("id") id: string) {
    return this.cinemaService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(200)
  update(@Param("id") id: string, @Body() updateCinemaDto: UpdateCinemaDto) {
    return this.cinemaService.update(id, updateCinemaDto);
  }

  @Delete(":id")
  @HttpCode(200)
  remove(@Param("id") id: string) {
    return this.cinemaService.remove(id);
  }
}
