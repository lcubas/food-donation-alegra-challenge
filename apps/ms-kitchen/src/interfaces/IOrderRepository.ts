import { Order } from '../models/Order';

export interface IOrderRepository {
  findById(orderId: string): Promise<Order>;
  update(orderId: string, order: Order): Promise<void>;
}
