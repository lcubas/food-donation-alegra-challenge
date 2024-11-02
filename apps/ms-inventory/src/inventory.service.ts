import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from './models/Ingredient';
import { MS_ORDER_CLIENT_NAME } from '@app/libs/shared';
import { MarketApiService } from './market-api.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InventoryService {
  constructor(
    private readonly marketApi: MarketApiService,

    @Inject(MS_ORDER_CLIENT_NAME) private readonly orderClient: ClientProxy,
    @InjectModel(Ingredient.name) private readonly ingredientModel: Model<Ingredient>,
  ) {}

  async handleIngredientRequest(ingredients: Ingredient[]) {
    const unavailableIngredients = [];

    // Verifica la disponibilidad de ingredientes
    for (const item of ingredients) {
      const ingredient = await this.ingredientModel.findOne({ name: item.name });
      if (!ingredient || ingredient.stockQuantity < item.stockQuantity) {
        unavailableIngredients.push(item);
      } else {
        ingredient.stockQuantity -= item.stockQuantity;
        await ingredient.save();
      }
    }

    // Si faltan ingredientes, intenta comprarlos
    if (unavailableIngredients.length > 0) {
      await this.purchaseMissingIngredients(unavailableIngredients);
    } else {
      // TODO: orderId is missing to emit the "ingredients supplied" event
      this.orderClient.emit('ingredients_supplied', {});
    }
  }

  private async purchaseMissingIngredients(ingredients: Ingredient[]) {
    const purchasedItems = [];

    for (const item of ingredients) {
      try {
        const quantitySold = await lastValueFrom(this.marketApi.getIngredient(item.name));

        if (quantitySold > 0) {
          purchasedItems.push({ ingredient: item.name, quantity: quantitySold });
          await this.ingredientModel.updateOne(
            { name: item.name },
            { $inc: { quantity: quantitySold } },
            { upsert: true },
          );
        }
      } catch (error) {
        console.error(`Error purchasing ${item.name}:`, error.message);
      }
    }

    // Si los ingredientes aún faltan, espera a la disponibilidad en el mercado
    if (purchasedItems.length === ingredients.length) {
      // TODO: orderId is missing to emit the "ingredients supplied" event
      this.orderClient.emit('ingredients_supplied', {});
    } else {
      // TODO: Implement retry or notification logic
      console.warn('Some ingredients are still missing after purchase attempt');
    }
  }
}
