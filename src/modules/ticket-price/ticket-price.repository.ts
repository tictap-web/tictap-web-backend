import { PrismaService } from "src/database/prisma.service";
import { CreateTicketPriceDto } from "./dto/create-ticket-price.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TicketPriceRepository {
    constructor(private prisma: PrismaService) {}

    async create(createTicketPriceDto: CreateTicketPriceDto) {
        return this.prisma.ticketPrice.create({
            data: createTicketPriceDto,
        });
    }

    async findAll() {
        return this.prisma.ticketPrice.findMany();
    }
}