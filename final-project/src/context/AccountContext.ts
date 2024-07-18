import { createContext } from "react";
import Recipe from "../models/Recipe";
import Account from "../models/Account";
interface AccountContextModel {
  account: Account | null;
  updateAccount(): void;
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
  clearAllMeals(): void;
  setBodyType(
    height: number,
    heightSmallerNumber: number,
    weight: number,
    age: number,
    sex: string,
    calorieGoal: number,
    isImperial: boolean
  ): void;
}
const defaultValues: AccountContextModel = {
  account: null,
  updateAccount: () => {},
  addMacros: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  setBodyType: () => {},
  setCalorieGoal: () => {},
  // addMeal: () => {},
  removeMeal: () => {},
  clearAllMeals: () => {},
};
const AccountContext = createContext(defaultValues);
export default AccountContext;
