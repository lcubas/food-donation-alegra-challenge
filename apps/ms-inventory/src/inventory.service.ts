import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  INGREDIENTS_SUPPLIED_EVENT,
  MS_KITCHEN_CLIENT_NAME,
} from '@app/libs/shared';
import { MarketApiService } from './market-api.service';
import { IngredientRepository } from './repositories/IngredientRepository';
import { IngredientRequested } from './inventory.controller';

@Injectable()
export class InventoryService {
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;

  constructor(
    private readonly marketApiService: MarketApiService,
    private readonly ingredientRepository: IngredientRepository,

    @Inject(MS_KITCHEN_CLIENT_NAME)
    private readonly kitchenClientProxy: ClientProxy,
  ) {}

  async checkAvailabilityOfIngredients(
    ingredients: IngredientRequested[],
    orderId: string,
  ) {
    const unavailableIngredients = [];
    const availableIngredients = await this.ingredientRepository.findAll();

    for (const item of ingredients) {
      const ingredient = availableIngredients.find(
        (ingredient) => ingredient.name === item.name,
      );

      if (!ingredient || ingredient.stockQuantity < item.quantity) {
        unavailableIngredients.push({
          ...item,
          quantity: item.quantity - ingredient.stockQuantity,
        });
      }
    }

    // If ingredients are unavailable, try to buy them.
    if (unavailableIngredients.length > 0) {
      await this.purchaseUnavailableIngredients(unavailableIngredients);
    }

    await lastValueFrom(
      this.kitchenClientProxy.emit(INGREDIENTS_SUPPLIED_EVENT, { orderId }),
    );
  }

  private async purchaseUnavailableIngredients(
    ingredients: IngredientRequested[],
  ) {
    for (const item of ingredients) {
      let remainingQuantity = item.quantity;
      let attempts = 0;

      while (remainingQuantity > 0 && attempts < this.maxRetries) {
        attempts++;

        try {
          const quantitySold = await lastValueFrom(
            this.marketApiService.getIngredient(item.name),
          );

          if (quantitySold > 0) {
            remainingQuantity -= quantitySold;

            await this.ingredientRepository.update(item.name, {
              $inc: { stockQuantity: quantitySold },
            });

            if (remainingQuantity <= 0) {
              break;
            }
          }
        } catch (error) {
          console.log(error);
        }

        // Wait before next attempt
        if (remainingQuantity > 0) {
          await this.delay(this.retryDelay);
        }
      }
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
