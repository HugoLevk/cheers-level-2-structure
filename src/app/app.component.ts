import { Declaration } from './../../node_modules/@types/estree/index.d';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
  import { ListCocktailComponent } from './components/list-cocktail/list-cocktail.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, ListCocktailComponent ],
  providers: [ HttpClient ],
  templateUrl: 'app.component.html',
})
export class AppComponent {
}
