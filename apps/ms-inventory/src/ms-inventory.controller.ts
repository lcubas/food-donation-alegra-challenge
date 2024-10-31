import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from './models/Ingredient';

@Controller()
export class MsInventoryController {
  constructor(
    @InjectModel(Ingredient.name) private readonly ingredientModel: Model<Ingredient>
  ) {}

  @Get()
  getHello() {
    return this.ingredientModel.find().exec();
  }
}
