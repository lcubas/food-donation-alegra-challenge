import { Inject, Injectable } from '@nestjs/common';
import { OrderStateEnum } from './models/Order';
import { RecipeRepository } from './repositories/RecipeRepository';
import { OrderRepository } from './repositories/OrderRepository';
import { OrderCreatedEventPayload } from './kitchen.controller';
import {
  INGREDIENTS_REQUESTED_EVENT,
  MS_INVENTORY_CLIENT_NAME,
} from '@app/libs/shared';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class KitchenService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly recipeRepository: RecipeRepository,

    @Inject(MS_INVENTORY_CLIENT_NAME) private inventoryClientProxy: ClientProxy,
  ) {}

  async handleOrderCreated(data: OrderCreatedEventPayload) {
    const recipe = await this.recipeRepository.findById(data.recipeId);

    await lastValueFrom(
      this.inventoryClientProxy.emit(INGREDIENTS_REQUESTED_EVENT, {
        orderId: data.orderId,
        ingredients: recipe.ingredients,
      }),
    );
    await this.orderRepository.update(data.orderId, {
      status: OrderStateEnum.INGREDIENTS_REQUESTED,
    });
  }
}
