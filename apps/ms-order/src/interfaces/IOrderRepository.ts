import { Order } from '../models/Order';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
}
