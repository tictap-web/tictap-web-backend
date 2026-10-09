import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateCinemaDto } from "./dto/create-cinema.dto";
import { UpdateCinemaDto } from "./dto/update-cinema.dto";

@Injectable()
export class CinemaRepository {
  constructor(private prisma: PrismaService) {}

  async create(createCinemaDto: CreateCinemaDto) {
    return this.prisma.cinema.create({
      data: createCinemaDto,
    });
  }

  async findAll() {
    return this.prisma.cinema.findMany();
  }

  async findById(id: string) {
    return this.prisma.cinema.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCinemaDto: UpdateCinemaDto) {
    return this.prisma.cinema.update({
      where: { id },
      data: updateCinemaDto,
    });
  }

  async remove(id: string) {
    return this.prisma.cinema.delete({
      where: { id },
    });
  }
}
