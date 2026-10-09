import { IsUUID } from "class-validator";
import { TheaterType } from "../../../../generated/prisma/client";

export class CreateTicketPriceDto {
    @IsUUID()
    cinemaId!: string;

    
    type!: TheaterType;

    price!: number;
}
