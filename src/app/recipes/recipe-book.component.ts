
import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})

export class RecipeBookComponent {
  selectedRecipe: any;
  showForm = false;
  newRecipe: Partial<Recipe> = { ingredients: [] };

  constructor(private recipeService: RecipeService) {}

  onRecipeSelected(recipe: any) {
    this.selectedRecipe = recipe;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.newRecipe = { ingredients: [] };
  }

  addIngredientToNewRecipe(name: string, amount: number) {
    if (!this.newRecipe.ingredients) this.newRecipe.ingredients = [];
    this.newRecipe.ingredients.push({ name, amount });
  }

  removeIngredientFromNewRecipe(index: number) {
    if (this.newRecipe.ingredients) this.newRecipe.ingredients.splice(index, 1);
  }

  addNewRecipe() {
    if (this.newRecipe.name && this.newRecipe.description && this.newRecipe.ingredients && this.newRecipe.ingredients.length > 0) {
      this.recipeService.addRecipe({
        name: this.newRecipe.name!,
        description: this.newRecipe.description!,
        imagePath: this.newRecipe.imagePath || '',
        ingredients: this.newRecipe.ingredients!
      });
      this.toggleForm();
    }
  }
}
