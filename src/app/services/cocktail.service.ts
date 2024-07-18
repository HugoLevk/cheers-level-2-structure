import { Cocktail, ICocktail } from './../model/cocktail.model';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FavoriteService } from './favorite.service';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  _cocktails : ICocktail[];

  apiUrl : string = 'https://localhost:4200/api';

  constructor(private http : HttpClient, private favoriteService : FavoriteService) {

  }

  /// <summary>
  /// Calls favorite service and cocktail API to get cocktails and tag favorites ones.
  /// </summary>
  /// <returns>An Observable of an array of cocktails</returns>
  getCocktails() : Observable<Cocktail[]> {

    //Get cocktails and toggle favorites
    return this.http.get<ICocktail[]>('/cocktails').pipe(
      tap(cocktails => {
        console.table(cocktails);
        cocktails.forEach(cocktail => {
          cocktail.isFavorite = this.favoriteService._favoritesCocktailsIds.has(cocktail.id);
        });
      })
    );
  }

  /// <summary>
  /// Get a cocktail by its id
  /// </summary>
  /// <param name="id">The cocktail id</param>
  /// <returns>An Observable of the cocktail with the id</returns>
  getCocktailById(id : number) : Observable<Cocktail> {
    return this.http.get<ICocktail>('/cockails/' + id).pipe(
      tap(cocktail => {
        cocktail.isFavorite = this.favoriteService._favoritesCocktailsIds.has(cocktail.id);
      })
    );
  }

  /// <summary>
  /// Toggle a cocktail favorite status
  /// </summary>
  /// <param name="id">The cocktail id</param>
  toggleFavorite(id : number) : void {
    this.favoriteService.toggleFavorite(id);
  }
}
