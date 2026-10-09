import { IsArray, IsUUID } from "class-validator";
import { OrderStatus } from "generated/prisma/enums";

export class CreateOrderDto {
  @IsUUID()
  showtimeId!: string;

  @IsArray()
  seatIds!: string[];
}
