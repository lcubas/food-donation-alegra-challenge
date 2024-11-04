import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
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

  async update(name: string, updateQuery: UpdateQuery<Ingredient>) {
    await this.ingredientModel.updateOne({ name: name }, updateQuery);
  }
}
