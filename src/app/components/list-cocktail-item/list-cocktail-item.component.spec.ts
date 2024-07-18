import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCocktailItemComponent } from './list-cocktail-item.component';


  import { FormsModule } from '@angular/forms';
  import { BrowserModule } from '@angular/platform-browser';
describe('ListCocktailItemComponent', () => {
  let component: ListCocktailItemComponent;
  let fixture: ComponentFixture<ListCocktailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, BrowserModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCocktailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
