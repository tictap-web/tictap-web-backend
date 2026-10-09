import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateSeatDto {
  @IsString()
  @IsNotEmpty()
  theaterId!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(26)
  @Matches(/^[A-Z]$/, { each: true })
  rows!: string[];

  @Type(() => Number)
  @Min(1)
  @Max(50)
  seatsPerRow!: number;
}
