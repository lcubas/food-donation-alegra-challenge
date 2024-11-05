import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, FilterQuery, Model } from 'mongoose';
import { IOrderRepository } from '../interfaces/IOrderRepository';
import { Order } from '../models/Order';

export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  findByQuery(filterQuery: FilterQuery<Order>) {
    return this.orderModel.find<Order>(filterQuery).exec();
  }

  findById(id: string): Promise<Order | null> {
    return this.orderModel.findById<Order>(id).exec();
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.find<Order>().exec();
  }

  create(order: Partial<Order>): Promise<Order> {
    return this.orderModel.create(order);
  }

  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
