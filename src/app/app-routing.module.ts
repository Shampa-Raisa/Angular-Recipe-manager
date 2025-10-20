import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeBookComponent } from './recipes/recipe-book.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipeBookComponent },
  { path: 'recipes/:name', component: RecipeBookComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', component: PageNotFoundComponent } //** eta holo wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
