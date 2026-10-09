import { IsDateString, IsUUID, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateShowtimeDto {
  @IsUUID()
  movieId!: string;

  @IsUUID()
  theaterId!: string;

  @Type(() => Date) 
  @IsDate()
  startTime!: Date;
}
