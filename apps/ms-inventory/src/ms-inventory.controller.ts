import { Controller, Get } from '@nestjs/common';
import { MsInventoryService } from './ms-inventory.service';

@Controller()
export class MsInventoryController {
  constructor(private readonly msInventoryService: MsInventoryService) {}

  @Get()
  getHello(): string {
    return this.msInventoryService.getHello();
  }
}
