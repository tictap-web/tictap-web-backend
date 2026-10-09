import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { CinemaRepository } from "./cinema.repository"
import { PrismaModule } from 'src/database/prisma.module';


@Module({
  controllers: [CinemaController],
  providers: [CinemaService, CinemaRepository],
  imports: [PrismaModule]
})
export class CinemaModule {}
