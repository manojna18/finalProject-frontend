import { createContext } from "react";
import User from "../models/User";
import Recipe from "../models/Recipe";
interface UserContextModel {
  user: User | null;
  addMacros(
    calories: number,
    protein: number,
    carbs: number,
    fats: number
  ): void;
  addFavorite(recipe: Recipe): void;
  removeFavorite(recipe: Recipe): void;
  setBodyType(height: number, weight: number, age: number, sex: string): void;
}
const defaultValues: UserContextModel = {
  user: null,
  addMacros: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  setBodyType: () => {},
};
const UserContext = createContext(defaultValues);
export default UserContext;
