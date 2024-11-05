import { Controller, Get } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('/')
  async findAll() {
    return await this.recipeService.findAllIngredients();
  }
}
