import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { TheaterType } from "generated/prisma/enums";

export class CreateTheaterDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsUUID()
    @IsNotEmpty()
    cinemaId!: string;

    @IsNotEmpty()
    type!: TheaterType;
}
