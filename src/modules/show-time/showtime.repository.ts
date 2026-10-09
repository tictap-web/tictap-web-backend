import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateShowtimeDto } from "./dto/create-showtime.dto";

const BUFFER_MINUTES = 15; 

@Injectable()
export class ShowtimeRepository {
  constructor(private prisma: PrismaService) {}

  private readonly showtimeInclude = {
    movie: true,
    theater: { include: { cinema: true } },
  } as const;

  async create(dto: CreateShowtimeDto) {
    // 1. FK pre-check → 404 yang manusiawi, bukan P2003 (500)
    const movie = await this.prisma.movie.findUnique({
      where: { id: dto.movieId },
    });
    if (!movie) throw new NotFoundException("Movie not found");

    const theater = await this.prisma.theater.findUnique({
      where: { id: dto.theaterId },
    });
    if (!theater) throw new NotFoundException("Theater not found");

    // 2. Cek overlap di theater yang sama — pakai durasi film + buffer
    const newStart = dto.startTime;
    const newEnd = new Date(
      newStart.getTime() + (movie.duration + BUFFER_MINUTES) * 60_000,
    );

    const candidates = await this.prisma.showtime.findMany({
      where: {
        theaterId: dto.theaterId,
        startTime: {
          // cukup cek yang mulai dalam rentang relevan, bukan semua showtime
          gte: new Date(newStart.getTime() - 24 * 60 * 60_000),
          lte: newEnd,
        },
      },
      include: { movie: true },
    });

    const overlapping = candidates.some((s) => {
      const sStart = s.startTime;
      const sEnd = new Date(
        sStart.getTime() + (s.movie.duration + BUFFER_MINUTES) * 60_000,
      );
      return sStart < newEnd && sEnd > newStart;
    });

    if (overlapping) {
      throw new ConflictException(
        "Theater already has a showtime that overlaps this time slot",
      );
    }

    try {
      return await this.prisma.showtime.create({
        data: { movieId: dto.movieId, theaterId: dto.theaterId, startTime: dto.startTime },
        include: this.showtimeInclude,
      });
    } catch (error) {
      if (
        (error as { code?: string }).code === "P2002"
      ) {
        throw new ConflictException("Showtime already exists for this movie, theater, and time");
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.showtime.findMany({
      where: { startTime: { gt: new Date() } }, 
      orderBy: { startTime: "asc" },
      include: {
        movie: true,
        theater: { include: { cinema: true } },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.showtime.findUnique({
      where: { id },
      include: this.showtimeInclude,
    });
  }

  getSeatMap(showtimeId: string) {
    return this.prisma.showtime.findUnique({
      where: { id: showtimeId },
      select: {
        id: true,
        startTime: true,
        movie: { select: { title: true, posterUrl: true, duration: true } },
        theater: {
          select: {
            name: true,
            type: true,
            seats: {
              orderBy: [{ row: "asc" }, { number: "asc" }],
              select: {
                id: true,
                row: true,
                number: true,
                orderSeats: { where: { showtimeId }, select: { id: true } },
              },
            },
          },
        },
      },
    });
  }
}