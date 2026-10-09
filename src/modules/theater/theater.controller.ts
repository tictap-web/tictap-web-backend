import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller("theaters")
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTheaterDto: CreateTheaterDto) {
    return this.theaterService.create(createTheaterDto);
  }

  @Get()
  @HttpCode(200)
  @AllowAnonymous()
  findAll() {
    return this.theaterService.findAll();
  }

  @Get(":id")
  @HttpCode(200)
  @AllowAnonymous()
  findOne(@Param("id") id: string) {
    return this.theaterService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(200)
  update(@Param("id") id: string, @Body() updateTheaterDto: UpdateTheaterDto) {
    return this.theaterService.update(id, updateTheaterDto);
  }

  @Delete(":id")
  @HttpCode(200)
  remove(@Param("id") id: string) {
    return this.theaterService.remove(id);
  }
}
