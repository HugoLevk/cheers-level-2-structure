import { Component, Input } from '@angular/core';
import { Cocktail } from '../../model/cocktail.model';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-cocktail-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-cocktail-item.component.html',
  styleUrl: './list-cocktail-item.component.scss'
})
export class ListCocktailItemComponent {

  constructor(private favoriteService : FavoriteService, private _router : Router) { }

  @Input()
  cocktail : Cocktail;

  toggleFavorite() : void {
    this.cocktail.isFavorite = !this.cocktail.isFavorite;
    this.favoriteService.toggleFavorite(this.cocktail.id);
  }

  viewDetails() : void {
    this._router.navigate(['/cocktails', this.cocktail.id]);
  }

  onKeyPress($event: KeyboardEvent) : void {
    console.log('CocktailDetailComponent onKeyPress', $event.key);
  }
}
