import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe = { id: 0, name: '', description: '', imagePath: '', ingredients: [] };
  id!: number;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    // Detect route parameter changes
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null; // If id exists → edit mode true
      if (this.editMode) {
        const existingRecipe = this.recipeService.getRecipeById(this.id);
        if (existingRecipe) {
          this.recipe = { ...existingRecipe }; // Prefill form
        }
      }
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipe);
      console.log('Recipe updated:', this.recipe);
    } else {
      this.recipeService.addRecipe(this.recipe);
      console.log('New recipe added:', this.recipe);
    }
    this.router.navigate(['/recipes']); // Go back to recipes list
  }
}
