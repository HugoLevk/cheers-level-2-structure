import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/// <summary>
/// Favorite service - Charged to save and get favorites cocktails from local storage
/// </summary>
export class FavoriteService {

    _favoritesCocktailsIds : Set<number>;

    constructor() {
        this._favoritesCocktailsIds = new Set<number>();
        this.loadFavorites();
    }

    /// <summary>
    /// Load favorites cocktails from local storage
    /// </summary>
    loadFavorites() : Set<number> {
        let localFavoritesCocktails = localStorage.getItem('favoritesCocktails');
        if(localFavoritesCocktails){
            this._favoritesCocktailsIds = new Set(JSON.parse(localFavoritesCocktails));
        }
        console.table(this._favoritesCocktailsIds);
        return this._favoritesCocktailsIds;
    }

    /// <summary>
    /// Save favorites cocktails in local storage
    /// </summary>
    saveFavorites() : void {
        localStorage.setItem('favoritesCocktails', JSON.stringify(Array.from(this._favoritesCocktailsIds)));
        console.log('Favorites saved');
    }

    /// <summary>
    /// Add or Remove a cocktail to/from favorites then save them in local storage.
    /// </summary>
    /// <param name="cocktailId">The cocktail id to add or remove from favorites</param>
    /// <returns>True if the cocktail is now in favorites, false otherwise</returns>
    toggleFavorite(cocktailId : number) : boolean {

      let hasBeenAddedToFavorites : boolean = false;

      if(this._favoritesCocktailsIds.has(cocktailId)){
            this._favoritesCocktailsIds.delete(cocktailId);
        }
        else{
            this._favoritesCocktailsIds.add(cocktailId);
            hasBeenAddedToFavorites = true;
        }

        console.log('Toggle favorite for cocktail ' + cocktailId + '. Is this cocktail a favorite now ? ' + hasBeenAddedToFavorites);

        this.saveFavorites();

        return hasBeenAddedToFavorites;
      }




}
