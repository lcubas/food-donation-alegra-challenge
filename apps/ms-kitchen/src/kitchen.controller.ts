import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ORDER_CREATED_EVENT } from '@app/libs/shared';
import { KitchenService } from './kitchen.service';

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
    console.log("MS_KITCHEN:KitchenController:handleOrderCreatedEvent->", payload)

    await this.kitchenService.handleOrderCreatedEvent(payload);

    const channel = context.getChannelRef();
    channel.ack(context.getMessage());
  }
}
