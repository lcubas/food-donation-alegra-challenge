import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { INGREDIENTS_REQUESTED_EVENT } from '@app/libs/shared';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
  ) {}

  @EventPattern(INGREDIENTS_REQUESTED_EVENT)
  async handleIngredientsRequested(@Payload() payload: any, @Ctx() context: RmqContext,) {
    console.log("MS_INVENTORY:InventoryController:handleIngredientsRequested->", payload)

    const channel = context.getChannelRef();
    channel.ack(context.getMessage());
  }
}
