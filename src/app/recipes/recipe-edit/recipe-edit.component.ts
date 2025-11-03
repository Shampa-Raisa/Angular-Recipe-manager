import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';  // adjust path if needed
import { RecipeService } from '../recipe.service';  // optional, if you have one

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe = { id: 0, name: '', description: '', imagePath: '', ingredients: [] }; // default empty recipe
  editMode = false;
  id!: number;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router
            ) { }

 ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

      if (this.editMode) {
        // Load existing recipe to edit
        const existingRecipe = this.recipeService.getRecipeById(this.id);
        if (existingRecipe) {
          // Make a copy so that ngModel works properly
          this.recipe = { ...existingRecipe } as Recipe;
        }
      } else {
        // If adding new recipe, clear the form
        this.recipe = { id: 0, name: '', description: '', imagePath: '', ingredients: [] };
      }
    });
  }

  onSubmit() {
    if (this.editMode) {
      // Update the existing recipe
      this.recipeService.updateRecipe(this.id, this.recipe);
    } else {
      // Add a new recipe
      this.recipeService.addRecipe(this.recipe);
    }

    // Navigate back to recipes list
    this.router.navigate(['/recipes']);
  }
}