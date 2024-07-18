import { CocktailService } from './../../services/cocktail.service';
import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../../model/cocktail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cocktail-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ HttpClient, ActivatedRoute, Router ],
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.scss']
})
export class CocktailDetailComponent implements OnInit {

  cocktail! : Cocktail;

  constructor(private cocktailService: CocktailService, private activatedRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    console.log('CocktailDetailComponent ngOnInit');
    this.activatedRoute.params.subscribe(params => {
      console.log('CocktailDetailComponent ngOnInit params', params);
      this.cocktailService.getCocktailById(params['id']).subscribe(cocktail => {
        this.cocktail = cocktail;
        console.log('CocktailDetailComponent ngOnInit cocktail', cocktail);
      });
    });
  }

  goBack() : void{
    this.router.navigate(['/cocktails']);
  }

  toggleFavorite() : void {
    this.cocktail.isFavorite = !this.cocktail.isFavorite;
    this.cocktailService.toggleFavorite(this.cocktail.id);
  }

  onKeyPress($event: KeyboardEvent) : void {
    console.log('CocktailDetailComponent onKeyPress', $event.key);
  }
}
