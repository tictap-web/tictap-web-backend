import { Module } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { TheaterController } from './theater.controller';
import { TheaterRepository } from './theater.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TheaterController],
  providers: [TheaterService, TheaterRepository],
})
export class TheaterModule {}
