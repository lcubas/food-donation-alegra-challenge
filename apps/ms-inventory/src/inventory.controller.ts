import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from './models/Ingredient';
import { EventPattern } from '@nestjs/microservices';
import { PLACE_ORDER_EVENT_NAME } from '@app/libs/shared';

@Controller()
export class InventoryController {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly ingredientModel: Model<Ingredient>,
  ) {}

  // @EventPattern(PLACE_ORDER_EVENT_NAME)
  // async testEvent(data: Record<string, unknown>) {
  //   console.log('testEvent', data);
  // }
}
