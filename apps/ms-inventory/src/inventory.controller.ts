import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { INGREDIENTS_REQUESTED_EVENT } from '@app/libs/shared';
import { InventoryService } from './inventory.service';
import { MarketApiService } from './market-api.service';
import { lastValueFrom } from 'rxjs';

export type RecipeIngredientData = {
  name: string,
  quantity: number,
};

export type IngredientsRequestEventPayload = {
  ingredients: RecipeIngredientData[]
};

@Controller()
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly api: MarketApiService,
  ) {}

  @EventPattern(INGREDIENTS_REQUESTED_EVENT)
  async handleIngredientsRequested(
    @Payload() payload: IngredientsRequestEventPayload,
    @Ctx() context: RmqContext
  ) {
    console.log("MS_INVENTORY:InventoryController:handleIngredientsRequested->", payload)

    const fd = await lastValueFrom(this.api.getIngredient(payload.ingredients[0].name));
    console.log(fd);

    const channel = context.getChannelRef();
    channel.ack(context.getMessage());
  }
}
