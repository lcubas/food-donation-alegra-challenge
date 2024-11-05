import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MS_KITCHEN_CLIENT_NAME, ORDER_CREATED_EVENT } from '@app/libs/shared';
import { RecipeRepository } from './repositories/RecipeRepository';
import { OrderRepository } from './repositories/OrderRepository';
import { OrderStateEnum } from './models/Order';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly recipeRepository: RecipeRepository,

    @Inject(MS_KITCHEN_CLIENT_NAME) private kitchenClientProxy: ClientProxy,
  ) {}

  // TODO: Improve error handling
  async handlePlaceOrder() {
    const session = await this.orderRepository.startTransaction();

    try {
      const randomRecipe = await this.recipeRepository.getRandom();
      const newOrder = await this.orderRepository.create({
        recipeId: randomRecipe._id.toString(),
        status: OrderStateEnum.CREATED,
      });

      await lastValueFrom(
        this.kitchenClientProxy.emit(ORDER_CREATED_EVENT, {
          orderId: newOrder.id,
          recipeId: newOrder.recipeId,
        }),
      );
      await session.commitTransaction();

      return newOrder;
    } catch (error) {
      session.abortTransaction();
      console.error(error);
      throw error;
    }
  }

  async findAllCompletedOrders () {
    return await this.orderRepository.findByQuery({
      status: OrderStateEnum.COMPLETED,
    });
  }

  async findAllActiveOrders () {
    return await this.orderRepository.findByQuery({
      status: {
        $ne: OrderStateEnum.COMPLETED,
      },
    });
  }

  async findOrderById (orderId: string) {
    return await this.orderRepository.findById(orderId);
  }
}
