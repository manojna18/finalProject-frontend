import { createContext } from "react";
import User from "../models/User";
import Recipe from "../models/Recipe";
interface UserContextModel {
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
const defaultValues: UserContextModel = {
  user: null,
  addMacros: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  setBodyType: () => {},
  setCalorieGoal: () => {},
  // addMeal: () => {},
  removeMeal: () => {},
};
const UserContext = createContext(defaultValues);
export default UserContext;
