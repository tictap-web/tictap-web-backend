import { IsString } from "class-validator"

export class CreateCinemaDto {
    @IsString()
    name!: string

    @IsString()
    city!: string

    @IsString()
    address!: string
}
