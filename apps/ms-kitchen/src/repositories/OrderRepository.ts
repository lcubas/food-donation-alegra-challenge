import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { Order } from '../models/Order';
import { IOrderRepository } from '../interfaces/IOrderRepository';

export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async findById(orderId: string): Promise<Order> {
    return await this.orderModel.findById(orderId).exec();
  }

  async update(
    orderId: string,
    updateQuery: UpdateQuery<Order>,
  ): Promise<void> {
    await this.orderModel.updateOne({ _id: orderId }, updateQuery);
  }
}
