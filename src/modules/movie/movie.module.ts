import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { MovieRepository } from './movie.repository';

@Module({
  controllers: [MovieController],
  providers: [
    MovieService,
    MovieRepository
  ],
  imports: [PrismaModule]
})
export class MovieModule {}
