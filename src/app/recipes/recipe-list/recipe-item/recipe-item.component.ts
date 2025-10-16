import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;

  constructor(private router: Router) {}

  openDetail() {
    // তুমি চাইলে detail রাউট করতে পারো; এখন simple action:
    alert(this.recipe.name);
    // অথবা router.navigate(['/recipes', this.recipe.id]);
  }
}
