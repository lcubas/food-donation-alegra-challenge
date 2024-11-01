import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, Model } from 'mongoose';
import { IOrderRepository } from '../interfaces/IOrderRepository';
import { Order } from '../models/Order';

export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(order: Partial<Order>): Promise<Order> {
    return this.orderModel.create(order);
  }

  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
