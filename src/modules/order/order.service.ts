import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderRepository } from "./order.repository";
import { SeatConflictError } from "src/common/error/seat.error.conflict";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Logger } from "@nestjs/common";

const ORDER_EXPIRY_MS = 15 * 60 * 1000;

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const showtime = await this.orderRepository.getShowtimeWithTicketPrice(
      createOrderDto.showtimeId,
    );

    if (!showtime) {
      throw new NotFoundException("Showtime not found");
    }

    if (showtime.startTime <= new Date()) {
      throw new BadRequestException("Showtime already started");
    }

    const seatIds = [...new Set(createOrderDto.seatIds)];

    if (seatIds.length === 0) {
      throw new BadRequestException("At least one seat is required");
    }

    const seats = await this.orderRepository.findSeatsByIds(seatIds);
    const isValidSeats =
      seats.length === seatIds.length &&
      seats.every((seat) => seat.theaterId === showtime.theaterId);

    if (!isValidSeats) {
      throw new BadRequestException("Invalid seats for this showtime");
    }

    const ticketPrice = showtime.theater.cinema.ticketPrices.find(
      (tp) => tp.type === showtime.theater.type,
    );

    if (!ticketPrice) {
      throw new InternalServerErrorException(
        "Ticket price not configured for this theater type",
      );
    }

    const totalPrice = ticketPrice.price * seatIds.length;
    const expiresAt = new Date(Date.now() + ORDER_EXPIRY_MS);

    try {
      return await this.orderRepository.create({
        userId,
        showtimeId: createOrderDto.showtimeId,
        seatIds,
        totalPrice,
        expiresAt,
      });
    } catch (error) {
      if (error instanceof SeatConflictError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  async findAll() {
    return await this.orderRepository.findAll();
  }

  async getMyOrder(userId: string, orderId: string) {
    const order = await this.orderRepository.findMyOrder(userId, orderId);
    if (!order) throw new NotFoundException("Order not found");
    return order;
  }

  getAllMyOrders(userId: string) {
    return this.orderRepository.findAllMyOrders(userId);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleExpiredOrders() {
    const count = await this.orderRepository.expireStaleOrders();
    if (count > 0) this.logger.log(`Expired ${count} orders`);
  }
}
