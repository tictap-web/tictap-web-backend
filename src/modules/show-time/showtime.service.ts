import { Injectable, NotFoundException } from "@nestjs/common";
import { ShowtimeRepository } from "./showtime.repository";
import { CreateShowtimeDto } from "./dto/create-showtime.dto";

@Injectable()
export class ShowtimeService {
  constructor(private readonly showtimeRepository: ShowtimeRepository) {}

  create(dto: CreateShowtimeDto) {
    return this.showtimeRepository.create(dto);
  }

  findAll() {
    return this.showtimeRepository.findAll();
  }

  async findOne(id: string) {
    const showtime = await this.showtimeRepository.findOne(id);
    if (!showtime) throw new NotFoundException("Showtime not found");
    return showtime;
  }

  async getSeatMap(showtimeId: string) {
    const seatMap = await this.showtimeRepository.getSeatMap(showtimeId);
    if (!seatMap) throw new NotFoundException("Showtime not found");

    return {
      showtimeId: seatMap.id,
      startTime: seatMap.startTime,
      movie: seatMap.movie,
      theater: { name: seatMap.theater.name, type: seatMap.theater.type },
      seats: seatMap.theater.seats.map((s) => ({
        id: s.id,
        row: s.row,
        number: s.number,
        isTaken: s.orderSeats.length > 0,
      })),
    };
  }
}
