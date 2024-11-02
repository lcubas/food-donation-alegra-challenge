import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../models/Order';
import { IOrderRepository } from '../interfaces/IOrderRepository';

export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async update(orderId: string, order: Partial<Order>): Promise<void> {
    await this.orderModel.updateOne({ _id: orderId }, order);
  }
}
