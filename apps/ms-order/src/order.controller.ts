import { Controller, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  b;

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
}
