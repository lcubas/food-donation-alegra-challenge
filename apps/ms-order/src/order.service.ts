import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  MS_KITCHEN_CLIENT_NAME,
  PLACE_ORDER_EVENT_NAME,
} from '@app/libs/shared';
import { RecipeRepository } from './repositories/RecipeRepository';
import { OrderRepository } from './repositories/OrderRepository';
import { OrderStateEnum } from './models/Order';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly recipeRepository: RecipeRepository,

    @Inject(MS_KITCHEN_CLIENT_NAME)
    private kitchenClientProxy: ClientProxy,
  ) {}

  // TODO: Improve error and transactions handling
  async handlePlaceOrder() {
    const session = await this.orderRepository.startTransaction();
    const randomRecipe = await this.recipeRepository.getRandom();

     try {
      const newOrder = await this.orderRepository.create({
        recipeId: randomRecipe._id.toString(),
        status: OrderStateEnum.CREATED,
      });

      await lastValueFrom(
        this.kitchenClientProxy.emit(PLACE_ORDER_EVENT_NAME, {
          orderId: newOrder.id,
        }),
      );
      await session.commitTransaction();

      return newOrder;
     } catch (error) {
      session.abortTransaction();

      console.log(error);

      throw error;
     }
  }
}
