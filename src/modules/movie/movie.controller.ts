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
import { MovieService } from "./movie.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";

@Controller("movies")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @HttpCode(201)
  @AllowAnonymous()
  async create(@Body() createMovieDto: CreateMovieDto) {
    const movie = await this.movieService.create(createMovieDto);

    return {
      message: "Movie sucessfully created",
      data: movie,
    };
  }

  @Get()
  @AllowAnonymous()
  async findAll() {
    const movies= await this.movieService.findAll();

    return {
      message: "Movies sucessfully retrieved",
      data: movies
    }
  }

  @Get(":id")
  @AllowAnonymous()
  async findOne(@Param("id") id: string) {
    const movie = await this.movieService.findOne(id);

    return {
      message: "Movie sucessfully retrieved",
      data: movie
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieService.update(id, updateMovieDto);

    return  {
      message: "Movie sucessfully updated",
      data: movie
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const movie = await this.movieService.remove(id);

    return { 
      message: "Movie sucessfully deleted",
      data: movie
    }
  }
}
