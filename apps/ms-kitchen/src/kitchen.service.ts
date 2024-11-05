import { Inject, Injectable } from '@nestjs/common';
import { OrderStateEnum } from './models/Order';
import { RecipeRepository } from './repositories/RecipeRepository';
import { OrderRepository } from './repositories/OrderRepository';
import {
  INGREDIENTS_REQUESTED_EVENT,
  MS_INVENTORY_CLIENT_NAME,
} from '@app/libs/shared';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IngredientRepository } from './repositories/IngredientRepository';

@Injectable()
export class KitchenService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly recipeRepository: RecipeRepository,
    private readonly ingredientRepository: IngredientRepository,

    @Inject(MS_INVENTORY_CLIENT_NAME) private inventoryClientProxy: ClientProxy,
  ) {}

  async handleOrderCreated(orderId: string, recipeId: string) {
    const recipe = await this.recipeRepository.findById(recipeId);

    await lastValueFrom(
      this.inventoryClientProxy.emit(INGREDIENTS_REQUESTED_EVENT, {
        orderId: orderId,
        ingredients: recipe.ingredients,
      }),
    );
    await this.orderRepository.update(orderId, {
      status: OrderStateEnum.INGREDIENTS_REQUESTED,
    });
  }

  async handlerIngredientsSupplied(orderId: string) {
    const order = await this.orderRepository.findById(orderId);

    await this.orderRepository.update(orderId, {
      status: OrderStateEnum.PREPARING,
    });

    await this.decreaseUsedIngredients(order.recipeId);

    // Simulate the preparation time
    await this.delay(1000);

    await this.orderRepository.update(orderId, {
      status: OrderStateEnum.COMPLETED,
      completedAt: new Date(),
    });
  }

  private async decreaseUsedIngredients(recipeId: string) {
    const recipe = await this.recipeRepository.findById(recipeId);

    for (const ingredient of recipe.ingredients) {
      await this.ingredientRepository.update(ingredient.name, {
        $inc: { stockQuantity: -ingredient.quantity },
      });
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
