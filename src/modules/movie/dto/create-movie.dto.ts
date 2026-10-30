import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    duration!: number;

    @IsString()
    @IsNotEmpty()
    posterUrl!: string

    @IsOptional()
    @IsString()
    backdropUrl?: string;

    @IsOptional()
    @IsString()
    ageRating?: string;

    @IsOptional()
    @IsInt()
    @Min(1888)
    releaseYear?: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    genres?: string[];

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    rating?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    reviewCount?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(100)
    audienceScore?: number;

    @IsOptional()
    @IsString()
    trailerUrl?: string;

    @IsOptional()
    @IsString()
    trailerDuration?: string;

    @IsOptional()
    @IsString()
    viewerMilestone?: string;
}
