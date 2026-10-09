import { Injectable } from "@nestjs/common";
import { SeatRepository } from "./seat.repository";
import { CreateSeatDto } from "./dto/create-seat.dto";

@Injectable()
export class SeatService {
  constructor(private readonly seatRepository: SeatRepository) {}

  async createMany(createSeatDto: CreateSeatDto) {
    const result = await this.seatRepository.createMany(createSeatDto);

    const seats = await this.seatRepository.findAllByTheater(
      createSeatDto.theaterId,
    );

    return {
      count: result.count,
      seats,
    };
  }

  findAll() {
    return this.seatRepository.findAll();
  }
}
