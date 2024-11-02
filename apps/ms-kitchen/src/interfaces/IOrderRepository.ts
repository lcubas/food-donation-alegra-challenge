import { Order } from '../models/Order';

export interface IOrderRepository {
  update(orderId: string, order: Order): Promise<void>;
}
