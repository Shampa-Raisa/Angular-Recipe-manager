
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
  editMode = false;

  constructor(private recipeService: RecipeService) {}

  onRecipeSelected(recipe: any) {
    this.selectedRecipe = recipe;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.newRecipe = { ingredients: [] };
      this.editMode = false; // Reset when closing form
    }
  }

  addIngredientToNewRecipe(name: string, amount: number) {
    if (!this.newRecipe.ingredients) this.newRecipe.ingredients = [];
    this.newRecipe.ingredients.push({ name, amount });
  }

  removeIngredientFromNewRecipe(index: number) {
    if (this.newRecipe.ingredients) this.newRecipe.ingredients.splice(index, 1);
  }
  editRecipe() {
    if (this.selectedRecipe) {
      this.newRecipe = { ...this.selectedRecipe };
      this.editMode = true;
      this.showForm = true;
    
    }
  }

saveEditedRecipe() {
  if (this.newRecipe.id) {
    this.recipeService.updateRecipe(this.newRecipe.id, this.newRecipe as Recipe);
    this.toggleForm();
  }
}
  onSubmit() {
    if (this.editMode) {
      this.saveEditedRecipe();
    } else {
      this.addNewRecipe();
    }
  }
  addNewRecipe() {
    if (this.newRecipe.name && this.newRecipe.description && this.newRecipe.ingredients && this.newRecipe.ingredients.length > 0) {
      this.recipeService.addRecipe({
        id:this.newRecipe.id!,
        name: this.newRecipe.name!,
        description: this.newRecipe.description!,
        imagePath: this.newRecipe.imagePath || '',
        ingredients: this.newRecipe.ingredients!
      });
      this.toggleForm();
    }
  }
}
