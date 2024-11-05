import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // TODO: Standardize API responses
  @Post('/place-order')
  async placeOrder(@Res() response: Response) {
    // TODO: Use serialization for standarized model responses
    const newOrder = await this.orderService.handlePlaceOrder();

    response.status(201).send({
      order: newOrder,
      message: 'Order placed successfully',
    });
  }

  @Get('/active')
  async findAllActiveOrders() {
    return await this.orderService.findAllActiveOrders();
  }

  @Get('/historical')
  async findAllCompletedOrders() {
    return await this.orderService.findAllCompletedOrders();
  }

  @Get('/:orderId')
  async findById(@Param('orderId') orderId: string) {
    return await this.orderService.findOrderById(orderId);
  }
}
