import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { Session } from "@thallesp/nestjs-better-auth";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Session() session: UserSession,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const data = await this.orderService.create(
      session.user.id,
      createOrderDto,
    );
    return { message: "Order created successfully", data };
  }

  @Get("my") 
  async getAllMyOrders(@Session() session: UserSession) {
    const data = await this.orderService.getAllMyOrders(session.user.id);
    return { message: "My orders fetched successfully", data };
  }

  @Get(":id")
  async getMyOrder(@Session() session: UserSession, @Param("id") id: string) {
    const data = await this.orderService.getMyOrder(session.user.id, id);
    return { message: "Order fetched successfully", data };
  }
}
