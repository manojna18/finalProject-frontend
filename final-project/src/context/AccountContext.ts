import { createContext } from "react";
import User from "../models/Account";
import Recipe from "../models/Recipe";
interface AccountContextModel {
  user: User | null;
  addMacros(
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    recipe: Recipe
  ): void;
  addFavorite(recipe: Recipe): void;
  // addMeal(recipe: Recipe): void;
  removeMeal(
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    recipe: Recipe
  ): void;
  removeFavorite(recipe: Recipe): void;
  setCalorieGoal(calorieGoal: number): void;
  setBodyType(height: number, weight: number, age: number, sex: string): void;
}
const defaultValues: AccountContextModel = {
  user: null,
  addMacros: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  setBodyType: () => {},
  setCalorieGoal: () => {},
  // addMeal: () => {},
  removeMeal: () => {},
};
const AccountContext = createContext(defaultValues);
export default AccountContext;
