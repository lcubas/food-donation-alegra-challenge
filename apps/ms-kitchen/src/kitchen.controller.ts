import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { PLACE_ORDER_EVENT_NAME } from '@app/libs/shared';

@Controller()
export class KitchenController {
  @EventPattern(PLACE_ORDER_EVENT_NAME)
  async handlePlaceOrder(@Payload() payload: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();

    console.log(payload);

    channel.ack(context.getMessage());
  }
}
