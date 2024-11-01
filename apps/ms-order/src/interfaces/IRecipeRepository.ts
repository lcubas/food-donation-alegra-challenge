import { Recipe } from '../models/Recipe';

export interface IRecipeRepository {
  getRandom(): Promise<Recipe>;
  findAll(): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe>;
}
