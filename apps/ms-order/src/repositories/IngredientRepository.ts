import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IIngredientRepository } from '../interfaces/IIngredientRepository';
import { Ingredient } from '../models/Ingredient';

export class IngredientRepository implements IIngredientRepository {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly ingredientModel: Model<Ingredient>,
  ) {}

  findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.find().exec();
  }
}
