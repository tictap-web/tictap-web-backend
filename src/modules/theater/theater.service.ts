import { Injectable } from "@nestjs/common";
import { CreateTheaterDto } from "./dto/create-theater.dto";
import { UpdateTheaterDto } from "./dto/update-theater.dto";
import { TheaterRepository } from "./theater.repository";

@Injectable()
export class TheaterService {
  constructor(private theaterRepository: TheaterRepository) {}

  create(createTheaterDto: CreateTheaterDto) {
    return this.theaterRepository.create(createTheaterDto);
  }

  findAll() {
    return this.theaterRepository.findAll();
  }

  findOne(id: string) {
    return this.theaterRepository.findById(id);
  }

  update(id: string, updateTheaterDto: UpdateTheaterDto) {
    return this.theaterRepository.update(id, updateTheaterDto);
  }

  remove(id: string) {
    return this.theaterRepository.delete(id);
  }
}
