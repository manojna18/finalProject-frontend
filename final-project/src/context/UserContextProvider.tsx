import { ReactNode, useState } from "react";
import User from "../models/User";
import UserContext from "./UserContext";
import Recipe from "../models/Recipe";
// import Recipe from "../components/Recipe";
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
      sex: "F",
    },
    totalDailyCalories: 0,
    totalDailyCarbs: 0,
    totalDailyFats: 0,
    totalDailyProtein: 0,
    calorieGoal: 0,
    favorites: [],
    meals: [],
  });
  const addMacros = (
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    recipe: Recipe
  ) => {
    setUser({
      _id: user?._id,
      bodyType: user!.bodyType,
      totalDailyCalories: user!.totalDailyCalories + calories,
      totalDailyCarbs: user!.totalDailyCarbs + carbs,
      totalDailyFats: user!.totalDailyFats + fats,
      totalDailyProtein: user!.totalDailyProtein + protein,
      favorites: user!.favorites,
      calorieGoal: user!.calorieGoal,
      meals: [...user!.meals, recipe],
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
      calorieGoal: user!.calorieGoal,
      favorites: [...user!.favorites, recipe],
      meals: user!.meals,
    });
  };

  const removeMeal = (
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    recipe: Recipe
  ): void => {
    const index = user!.meals.findIndex((m) => m.id === recipe.id);
    setUser({
      _id: user?._id,
      bodyType: user!.bodyType,
      totalDailyCalories: user!.totalDailyCalories - calories,
      totalDailyProtein: user!.totalDailyProtein - protein,
      totalDailyCarbs: user!.totalDailyCarbs - carbs,
      totalDailyFats: user!.totalDailyFats - fats,
      calorieGoal: user!.calorieGoal,
      favorites: user!.favorites,
      meals: [...user!.meals.slice(0, index), ...user!.meals.slice(index + 1)],
    });
  };
  const setCalorieGoal = (calorieGoal: number): void => {
    setUser({
      _id: user?._id,
      bodyType: user!.bodyType,
      totalDailyCalories: user!.totalDailyCalories,
      totalDailyProtein: user!.totalDailyProtein,
      totalDailyCarbs: user!.totalDailyCarbs,
      totalDailyFats: user!.totalDailyFats,
      calorieGoal: calorieGoal,
      favorites: [...user!.favorites],
      meals: user!.meals,
    });
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
      calorieGoal: user!.calorieGoal,
      favorites: [
        ...user!.favorites.slice(0, index),
        ...user!.favorites.slice(index + 1),
      ],
      meals: user!.meals,
    });
  };
  const setBodyType = (
    height: number,
    weight: number,
    age: number,
    sex: string
  ): void => {
    setUser({
      _id: user?._id,
      bodyType: {
        height,
        weight,
        age,
        sex,
      },
      totalDailyCalories: user!.totalDailyCalories,
      totalDailyProtein: user!.totalDailyProtein,
      totalDailyCarbs: user!.totalDailyCarbs,
      totalDailyFats: user!.totalDailyFats,
      calorieGoal: user!.calorieGoal,
      favorites: user!.favorites,
      meals: user!.meals,
    });
  };
  return (
    <UserContext.Provider
      value={{
        user,
        addMacros,
        addFavorite,
        removeFavorite,
        setBodyType,
        setCalorieGoal,
        removeMeal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
