import { PrismaService } from "src/database/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";
import { SeatConflictError } from "src/common/error/seat.error.conflict";

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  private readonly orderInclude = {
    seats: { include: { seat: true } },
    showtime: {
      include: {
        movie: true,
        theater: { include: { cinema: true } },
      },
    },
  } satisfies Prisma.OrderInclude;

  private readonly orderListInclude = {
    seats: { include: { seat: true } },
    showtime: { include: { movie: true } },
  } satisfies Prisma.OrderInclude;

  getShowtimeWithTicketPrice(showtimeId: string) {
    return this.prisma.showtime.findUnique({
      where: { id: showtimeId },
      include: {
        theater: {
          include: {
            cinema: {
              include: {
                ticketPrices: true,
              },
            },
          },
        },
      },
    });
  }

  async create(params: {
    userId: string;
    showtimeId: string;
    seatIds: string[];
    totalPrice: number;
    expiresAt: Date;
  }) {
    const { userId, showtimeId, seatIds, totalPrice, expiresAt } = params;
    try {
      return await this.prisma.order.create({
        data: {
          userId,
          showtimeId,
          totalPrice,
          expiresAt,
          seats: {
            create: seatIds.map((seatId) => ({ seatId, showtimeId })),
          },
        },
        include: this.orderInclude,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new SeatConflictError();
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.order.findMany({
      include: this.orderInclude,
    });
  }

  findAllMyOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: this.orderListInclude,
    });
  }

  findMyOrder(userId: string, orderId: string) {
    return this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: this.orderInclude,
    });
  }

  async findSeatsByIds(ids: string[]) {
    return await this.prisma.seat.findMany({ where: { id: { in: ids } } });
  }

async expireStaleOrders() {
  const flipped = await this.prisma.order.updateMany({
    where: { status: "PENDING", expiresAt: { lt: new Date() } },
    data: { status: "EXPIRED" },
  });

  await this.prisma.orderSeat.deleteMany({
    where: { order: { status: { in: ["EXPIRED", "CANCELLED"] } } },
  });

  return flipped.count;
}
}
