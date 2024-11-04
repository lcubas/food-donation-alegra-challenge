import { Ingredient } from '../models/Ingredient';

export interface IIngredientRepository {
  findAll(): Promise<Ingredient[]>;
  update(ingredientId: string, ingredient: Partial<Ingredient>): Promise<void>;
}
