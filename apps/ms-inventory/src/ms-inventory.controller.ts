import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from './models/Ingredient';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MsInventoryController {
  constructor(
    @InjectModel(Ingredient.name) private readonly ingredientModel: Model<Ingredient>
  ) {}
  
  @EventPattern('food-donation/test-event-sent')
  async testEvent(data: Record<string, unknown>) {
    console.log('testEvent', data);
  }
}
