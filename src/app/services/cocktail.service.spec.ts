import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CocktailService } from './cocktail.service';
import { FavoriteService } from './favorite.service';
import { Cocktail, ICocktail } from '../model/cocktail.model';

describe('CocktailService', () => {
  let service: CocktailService;
  let httpMock: HttpTestingController;
  let favoriteServiceSpy: jasmine.SpyObj<FavoriteService>;

  beforeEach(() => {
    const favoriteSpy = jasmine.createSpyObj('FavoriteService', ['toggleFavorite']);
    favoriteSpy._favoritesCocktailsIds = new Set(['12560']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CocktailService,
        { provide: FavoriteService, useValue: favoriteSpy }
      ]
    });

    service = TestBed.inject(CocktailService);
    httpMock = TestBed.inject(HttpTestingController);
    favoriteServiceSpy = TestBed.inject(FavoriteService) as jasmine.SpyObj<FavoriteService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCocktails', () => {
    it('should return an Observable of cocktails with favorite status', () => {
      const mockCocktails: ICocktail[] = [
        {
          id: 12560,
          name: 'Afterglow',
          isAlcoholic: false,
          isFavorite: false,
          imageUrl: 'https://www.thecocktaildb.com/images/media/drink/vuquyv1468876052.jpg',
          instructions: 'Mix. Serve over ice.',
          ingredients: ['Grenadine', 'Orange juice', 'Pineapple juice']
        },
        {
          id: 17141,
          name: 'Smut',
          isAlcoholic: true,
          isFavorite: false,
          imageUrl: 'https://www.thecocktaildb.com/images/media/drink/rx8k8e1504365812.jpg',
          instructions: 'Throw it all together and serve real cold.',
          ingredients: ['Red wine', 'Peach schnapps', 'Pepsi Cola', 'Orange juice']
        }
      ];

      service.getCocktails().subscribe(cocktails => {
        expect(cocktails.length).toBe(2);
        expect(cocktails[0].isFavorite).toBe(false);
        expect(cocktails[1].isFavorite).toBe(false);
      });

      const req = httpMock.expectOne('/cocktails');
      expect(req.request.method).toBe('GET');
      req.flush(mockCocktails);
    });
  });

  describe('getCocktailById', () => {
    it('should return an Observable of a single cocktail with favorite status', () => {
      const mockCocktail: ICocktail = {
        id: 17840,
        name: 'Affinity',
        isAlcoholic: true,
        isFavorite: false,
        imageUrl: 'https://www.thecocktaildb.com/images/media/drink/wzdtnn1582477684.jpg',
        instructions: 'In a mixing glass half-filled with ice cubes, combine all of the ingredients. Stir well. Strain into a cocktail glass.',
        ingredients: ['Scotch', 'Sweet Vermouth', 'Dry Vermouth', 'Orange bitters']
      };

      service.getCocktailById(17840).subscribe(cocktail => {
        expect(cocktail.id).toBe(17840);
        expect(cocktail.isFavorite).toBe(false);
      });

      const req = httpMock.expectOne('/cockails/17840');
      expect(req.request.method).toBe('GET');
      req.flush(mockCocktail);
    });
  });

  describe('toggleFavorite', () => {
    it('should call favoriteService.toggleFavorite with the correct id', () => {
      service.toggleFavorite(12560);
      expect(favoriteServiceSpy.toggleFavorite).toHaveBeenCalledWith(12560);
    });
  });

});
