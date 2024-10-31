import { Controller, Get } from '@nestjs/common';
import { MsKitchenService } from './ms-kitchen.service';

@Controller()
export class MsKitchenController {
  constructor(private readonly msKitchenService: MsKitchenService) {}

  @Get()
  getHello(): string {
    return this.msKitchenService.getHello();
  }
}
