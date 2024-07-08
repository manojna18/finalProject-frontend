export interface RecipeByID {
  id: number;
  title: string;
  image: string;
  sourceUrl: string;
  servings: number;
  readyInMinutes: number;
  diets: string[];
  vegan: boolean;
  dairyFree: boolean;
  glutenFree: boolean;
  vegetarian: boolean;
  dishTypes: string[];
  summary: string;
}
