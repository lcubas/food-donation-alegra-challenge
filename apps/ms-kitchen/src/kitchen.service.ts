import { Injectable } from '@nestjs/common';
import { OrderStateEnum } from './models/Order';
import { RecipeRepository } from './repositories/RecipeRepository';
import { OrderRepository } from './repositories/OrderRepository';
import { OrderCreatedEventPayload } from './kitchen.controller';

@Injectable()
export class KitchenService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async handleOrderCreatedEvent(data: OrderCreatedEventPayload) {
    const recipe = await this.recipeRepository.findById(data.recipeId);

    console.log(recipe.ingredients); // TODO: Emit event for inventory to search for ingredients

    await this.orderRepository.update(data.orderId, {
      status: OrderStateEnum.INGREDIENTS_REQUESTED,
    });
  }
}
