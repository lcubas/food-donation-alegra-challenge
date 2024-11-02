import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from '../models/Recipe';
import { IRecipeRepository } from '../interfaces/IRecipeRepository';

export class RecipeRepository implements IRecipeRepository {
  constructor(
    @InjectModel(Recipe.name) private readonly recipeModel: Model<Recipe>,
  ) {}

  findById(id: string): Promise<Recipe | null> {
    return this.recipeModel.findById(id).exec();
  }
}
