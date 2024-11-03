import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { INGREDIENTS_SUPPLIED_EVENT, MS_ORDER_CLIENT_NAME } from '@app/libs/shared';
import { MarketApiService } from './market-api.service';
import { IngredientRepository } from './repositories/IngredientRepository';
import { RecipeIngredientData } from './inventory.controller';

@Injectable()
export class InventoryService {
  constructor(
    private readonly marketApiService: MarketApiService,
    private readonly ingredientRepository: IngredientRepository,

    @Inject(MS_ORDER_CLIENT_NAME) private readonly orderClient: ClientProxy,
  ) {}

  async checkAvailabilityOfIngredients(ingredients: RecipeIngredientData[]) {
    const unavailableIngredients = [];
    const availableIngredients = await this.ingredientRepository.findAll();

    // Verifica la disponibilidad de ingredientes
    for (const item of ingredients) {
      const ingredient = availableIngredients.find(ingredient => ingredient.name === item.name);
      
      if (!ingredient || ingredient.stockQuantity < item.quantity) {
        unavailableIngredients.push({
          ...item,
          quantity: item.quantity - ingredient.stockQuantity,
        });
      }
    }

    // Si faltan ingredientes, intenta comprarlos
    if (unavailableIngredients.length > 0) {
      await this.purchaseMissingIngredients(unavailableIngredients);
    }
      
    this.orderClient.emit(INGREDIENTS_SUPPLIED_EVENT, {});
  }

  private async purchaseMissingIngredients(ingredientsToBuy: RecipeIngredientData[]) {
    const missingIngredients = [];

    for (const item of ingredientsToBuy) {
      try {
        const quantitySold = await lastValueFrom(
          this.marketApiService.getIngredient(item.name)
        );

        if (quantitySold > 0) {
          if (quantitySold < item.quantity) {
            missingIngredients.push({
              ...item,
              quantity: item.quantity - quantitySold,
            })
          }

          this.ingredientRepository.update(item.name, {
            $inc: { quantity: quantitySold },
          })
        } else {
          missingIngredients.push(item);
        }
      } catch (error) {
        console.error(`Error purchasing ${item.name}:`, error.message);
        missingIngredients.push(item);
      }
    }
  }
}
