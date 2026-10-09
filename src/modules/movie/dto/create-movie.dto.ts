import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    duration!: number;

    @IsString()
    @IsNotEmpty()
    posterUrl!: string
}
