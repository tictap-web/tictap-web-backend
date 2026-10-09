import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateSeatDto } from "./dto/create-seat.dto";

@Injectable()
export class SeatRepository {
  constructor(private prisma: PrismaService) {}

  async createMany(createSeatDto: CreateSeatDto) {
    const theater = await this.prisma.theater.findUnique({
      where: { id: createSeatDto.theaterId },
    });

    if (!theater) {
      throw new NotFoundException("Theater not found");
    }

    const existingSeats = await this.prisma.seat.count({
      where: { theaterId: createSeatDto.theaterId },
    });

    if (existingSeats > 0) {
      throw new ConflictException("Seats already configured for this theater");
    }

    const seats = createSeatDto.rows.flatMap((row) =>
      Array.from({ length: createSeatDto.seatsPerRow }, (_, index) => ({
        theaterId: createSeatDto.theaterId,
        row,
        number: index + 1,
      })),
    );

    return this.prisma.seat.createMany({ data: seats });
  }

  findAll() {
    return this.prisma.seat.findMany({
      orderBy: [{ row: "asc" }, { number: "asc" }],
    });
  }

  findAllByTheater(theaterId: string) {
    return this.prisma.seat.findMany({
      where: { theaterId },
      orderBy: [{ row: "asc" }, { number: "asc" }],
    });
  }
}
