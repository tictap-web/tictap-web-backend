import { Injectable } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { MovieRepository } from "./movie.repository";

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}
  
  async create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.create(createMovieDto);
  }

  async findAll() {
    return this.movieRepository.findAll();
  }

  async findOne(id: string) {
    return this.movieRepository.findById(id);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update(id, updateMovieDto);
  }

  async remove(id: string) {
    return this.movieRepository.remove(id);
  }
}
