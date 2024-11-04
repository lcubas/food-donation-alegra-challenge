import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { INGREDIENTS_SUPPLIED_EVENT, ORDER_CREATED_EVENT } from '@app/libs/shared';
import { KitchenService } from './kitchen.service';

export type IngredientsSuppliedEventPayload = {
  orderId: string;
};

export type OrderCreatedEventPayload = {
  orderId: string;
  recipeId: string;
};

@Controller()
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @EventPattern(ORDER_CREATED_EVENT)
  async handleOrderCreatedEvent(
    @Payload() payload: OrderCreatedEventPayload,
    @Ctx() context: RmqContext,
  ) {
    console.log(
      'MS_KITCHEN:KitchenController:handleOrderCreatedEvent->',
      payload,
    );

    await this.kitchenService.handleOrderCreated(payload);

    const channel = context.getChannelRef();
    channel.ack(context.getMessage());
  }

  @EventPattern(INGREDIENTS_SUPPLIED_EVENT)
  async handleIngredientSuppliedEvent(
    @Payload() payload: IngredientsSuppliedEventPayload,
    @Ctx() context: RmqContext,
  ) {
    console.log(
      'MS_KITCHEN:KitchenController:handleIngredientSuppliedEvent->',
      payload,
    );

    await this.kitchenService.handlerIngredientsSupplied(payload.orderId);

    const channel = context.getChannelRef();
    channel.ack(context.getMessage());
  }
}
