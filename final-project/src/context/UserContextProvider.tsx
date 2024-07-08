import { ReactNode, useState } from "react";
import User from "../models/User";
import UserContext from "./UserContext";
import Recipe from "../models/Recipe";
interface Props {
  children: ReactNode;
}
const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>({
    _id: "",
    bodyType: {
      height: 0,
      weight: 0,
      age: 0,
      sex: "F"
    },
    totalDailyCalories: 0,
    totalDailyCarbs: 0,
    totalDailyFats: 0,
    totalDailyProtein: 0,
    favorites: [],
  });
  const addMacros = (
    calories: number,
    protein: number,
    carbs: number,
    fats: number
  ) => {
    setUser({
      _id: user?._id,
      bodyType: user!.bodyType,
      totalDailyCalories: user!.totalDailyCalories + calories,
      totalDailyCarbs: user!.totalDailyCarbs + carbs,
      totalDailyFats: user!.totalDailyFats + fats,
      totalDailyProtein: user!.totalDailyProtein + protein,
      favorites: user!.favorites
    });
  };
  const addFavorite = (recipe: Recipe): void => {
    setUser({
      _id: user?._id,
      bodyType: user!.bodyType,
      totalDailyCalories: user!.totalDailyCalories,
      totalDailyProtein: user!.totalDailyProtein,
      totalDailyCarbs: user!.totalDailyCarbs,
      totalDailyFats: user!.totalDailyFats,
      favorites: [...user!.favorites, recipe]
    })
  };
  const removeFavorite = (recipe: Recipe): void => {
    const index = user!.favorites.findIndex((r) => r.id === recipe.id);
    setUser({
      _id: user?._id,
      bodyType: user!.bodyType,
      totalDailyCalories: user!.totalDailyCalories,
      totalDailyProtein: user!.totalDailyProtein,
      totalDailyCarbs: user!.totalDailyCarbs,
      totalDailyFats: user!.totalDailyFats,
      favorites: [...user!.favorites.slice(0, index), ...user!.favorites.slice(index+1)]
    })
  };
  const setBodyType = (height: number, weight: number, age: number, sex: string): void => {
    setUser({
      _id: user?._id,
      bodyType: {
        height,
        weight,
        age,
        sex
      },
      totalDailyCalories: user!.totalDailyCalories,
      totalDailyProtein: user!.totalDailyProtein,
      totalDailyCarbs: user!.totalDailyCarbs,
      totalDailyFats: user!.totalDailyFats,
      favorites: user!.favorites,
    })
  };
  return (
    <UserContext.Provider value={{ user, addMacros, addFavorite, removeFavorite, setBodyType }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
