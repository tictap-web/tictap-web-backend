import { PrismaService } from "src/database/prisma.service";
import { CreateTheaterDto } from "./dto/create-theater.dto";
import { UpdateTheaterDto } from "./dto/update-theater.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TheaterRepository {
  constructor(private prisma: PrismaService) {}

  async create(createTheaterDto: CreateTheaterDto) {
    return this.prisma.theater.create({
      data: createTheaterDto,
    });
  }

  async findAll() {
    return this.prisma.theater.findMany();
  }

  async findById(id: string) {
    return this.prisma.theater.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTheaterDto: UpdateTheaterDto) {
    return this.prisma.theater.update({
      where: { id },
      data: updateTheaterDto,
    });
  }

  async delete(id: string) {
    return this.prisma.theater.delete({
      where: { id },
    });
  }
}
