export interface ICocktail{
  id : number;
  name : string;
  isAlcoholic : boolean;
  isFavorite : boolean;
  imageUrl : string;
  instructions : string;
  ingredients : string[];
}

export class Cocktail implements ICocktail{
  id: number;
  name: string;
  isAlcoholic: boolean;
  isFavorite: boolean = false;
  imageUrl: string;
  instructions: string;
  ingredients: string[];

  constructor(id: number, name: string, isAlcoholic: boolean, imageUrl: string, instructions: string, ingredients: string[]){
    this.id = id;
    this.name = name;
    this.isAlcoholic = isAlcoholic;
    this.imageUrl = imageUrl;
    this.instructions = instructions;
    this.ingredients = ingredients;
  }
}
