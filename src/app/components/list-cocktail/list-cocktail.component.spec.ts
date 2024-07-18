import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCocktailComponent } from './list-cocktail.component';

describe('ListCocktailComponent', () => {
  let component: ListCocktailComponent;
  let fixture: ComponentFixture<ListCocktailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCocktailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCocktailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
