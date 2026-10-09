import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Injectable()
export class MovieRepository {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    return this.prisma.movie.create({
      data: createMovieDto,
    });
  }

  async findAll() {
    return this.prisma.movie.findMany();
  }

  async findById(id: string) {
    return this.prisma.movie.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  async remove(id: string) {
    return this.prisma.movie.delete({
        where: {id}
    })
  }
}
