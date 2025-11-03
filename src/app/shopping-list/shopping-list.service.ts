import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  // notify which item index is being edited
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ing: Ingredient) {
    console.log('Adding ingredient:', ing);
    this.ingredients.push(ing);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  addIngredients(ings: Ingredient[]) {
    console.log('Adding multiple ingredients:', ings);
    this.ingredients.push(...ings);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    console.log('Updating ingredient');
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.emit(this.getIngredients());
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.emit(this.getIngredients());
  }
}
