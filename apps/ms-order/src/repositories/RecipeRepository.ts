import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from '../models/Recipe';
import { IRecipeRepository } from '../interfaces/IRecipeRepository';

export class RecipeRepository implements IRecipeRepository {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<Recipe>,
  ) {}

  async getRandom(): Promise<Recipe> {
    const [recipe] = await this.recipeModel
      .aggregate<Recipe>([{ $sample: { size: 1 } }])
      .exec();
    return recipe;
  }

  findById(id: string): Promise<Recipe | null> {
    return this.recipeModel.findById(id).exec();
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeModel.find().exec();
  }
}
