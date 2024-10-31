import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { MS_INVENTORY_CLIENT_NAME } from './constants';

@Controller()
export class MsOrderController {
  constructor(
    private config: ConfigService,
    @Inject(MS_INVENTORY_CLIENT_NAME) private inventoryClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return "Hello from ms-order!";
  }

  @Get('/test')
  test(): string {
    this.inventoryClient.emit('food-donation/test-event-sent', { test: 'test', data: [0, 1] });
    console.log('AMQP_URL:', this.config.get('AMQP_URL'), process.env.AMQP_URL);
    return "Hello from ms-order!";
  }
}
