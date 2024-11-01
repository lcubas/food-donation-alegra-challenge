import { Injectable } from '@nestjs/common';
import { type Recipe } from './models/Recipe';
import { RecipeRepository } from './repositories/RecipeRepository';

@Injectable()
export class KitchenService {
  constructor(private readonly recipeRepository: RecipeRepository) {}
}
