import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { INGREDIENTS_REQUESTED_EVENT } from '@app/libs/shared';
import { InventoryService } from './inventory.service';

export type IngredientRequested = {
  name: string;
  quantity: number;
};

export type IngredientsRequestEventPayload = {
  orderId: string;
  ingredients: IngredientRequested[];
};

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @EventPattern(INGREDIENTS_REQUESTED_EVENT)
  async handleIngredientsRequested(
    @Payload() payload: IngredientsRequestEventPayload,
    @Ctx() context: RmqContext,
  ) {
    await this.inventoryService.checkAvailabilityOfIngredients(
      payload.ingredients,
      payload.orderId,
    );

    const channel = context.getChannelRef();
    channel.ack(context.getMessage());
  }
}
