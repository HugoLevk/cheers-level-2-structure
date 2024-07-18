import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { CocktailService } from '../../services/cocktail.service';
import { ICocktail } from '../../model/cocktail.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListCocktailItemComponent } from "../list-cocktail-item/list-cocktail-item.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-cocktail',
  standalone: true,
  imports: [FormsModule, CommonModule, ListCocktailItemComponent, HttpClientModule],
  providers: [ HttpClient ],
  templateUrl: './list-cocktail.component.html',
  styleUrl: './list-cocktail.component.scss'
})
export class ListCocktailComponent implements OnInit {

  _cocktailsList : ICocktail[];

  searchText : Signal<string>;

  filteredCocktailsSignal : Signal<ICocktail[]> ;

  constructor(private _cocktailService : CocktailService) {

  }

  ngOnInit(): void {
    this._cocktailService.getCocktails().subscribe(
      cocktails => this._cocktailsList = cocktails
    );
    console.table(this._cocktailsList);

    this.filteredCocktailsSignal = computed(() => {
      console.log("searchText : ", this.searchText());
      if( this.searchText() !== ""){
        return this._cocktailsList.filter(cocktail => cocktail.name.toLowerCase().includes(this.searchText().toLowerCase()));
      }
      else{
        return this._cocktailsList;
      }
    });

    this.searchText = signal("");
  }
}
