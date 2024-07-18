import { Routes } from '@angular/router';
import { ListCocktailComponent } from './components/list-cocktail/list-cocktail.component';
import { CocktailDetailComponent } from './components/cocktail-detail/cocktail-detail.component';

export const routes: Routes = [
  { path: 'cocktails', component: ListCocktailComponent },
  { path: 'cocktails/:id', component: CocktailDetailComponent },
  { path: '**', redirectTo: '/cocktails' }
];
