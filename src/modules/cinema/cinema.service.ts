import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { CinemaRepository } from "./cinema.repository"

@Injectable()
export class CinemaService {
  constructor(private readonly cinemaRepository: CinemaRepository) {}

  create(createCinemaDto: CreateCinemaDto) {
    return this.cinemaRepository.create(createCinemaDto)
  }

  findAll() {
    return this.cinemaRepository.findAll();
  }

  findOne(id: string) {
    return this.cinemaRepository.findById(id);
  }

  update(id: string, updateCinemaDto: UpdateCinemaDto) {
    return this.cinemaRepository.update(id, updateCinemaDto);
  }

  remove(id: string) {
    return this.cinemaRepository.remove(id);
  }
}
