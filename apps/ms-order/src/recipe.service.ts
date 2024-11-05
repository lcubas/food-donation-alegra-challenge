import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './repositories/RecipeRepository';
import { IngredientRepository } from './repositories/IngredientRepository';

@Injectable()
export class RecipeService {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async findAllRecipes () {
    return await this.recipeRepository.findAll();
  }

  async findAllIngredients () {
    return await this.ingredientRepository.findAll();
  }
}
