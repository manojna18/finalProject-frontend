import { ReactNode, useContext, useState } from "react";

import account from "../models/Account";
import accountContext from "./AccountContext";
import Recipe from "../models/Recipe";
import userContext from "./UserContext";
import Account from "../models/Account";
import AccountContext from "./AccountContext";
import { editAccount, getAccountInfo } from "../services/accountApiService";
// import Recipe from "../components/Recipe";
interface Props {
  children: ReactNode;
}
const AccountContextProvider = ({ children }: Props) => {
  const { user } = useContext(userContext);
  const [account, setAccountInfo] = useState<Account | null>({
    _id: user ? user.uid : "",
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
    if (account) {
      editAccount({
        ...account!,
        totalDailyCalories: account!.totalDailyCalories + calories,
        totalDailyCarbs: account!.totalDailyCarbs + carbs,
        totalDailyFats: account!.totalDailyFats + fats,
        totalDailyProtein: account!.totalDailyProtein + protein,
      });
      getAccountInfo(account._id!).then((res) => setAccountInfo(res));
    }
  };
  const addFavorite = (recipe: Recipe): void => {
    setAccountInfo({
      _id: user?.uid,
      bodyType: account!.bodyType,
      totalDailyCalories: account!.totalDailyCalories,
      totalDailyProtein: account!.totalDailyProtein,
      totalDailyCarbs: account!.totalDailyCarbs,
      totalDailyFats: account!.totalDailyFats,
      calorieGoal: account!.calorieGoal,
      favorites: [...account!.favorites, recipe],
      meals: account!.meals,
    });
  };

  const removeMeal = (
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    recipe: Recipe
  ): void => {
    const index = account!.meals.findIndex((m) => m.id === recipe.id);
    setAccountInfo({
      _id: user?.uid,
      bodyType: account!.bodyType,
      totalDailyCalories: account!.totalDailyCalories - calories,
      totalDailyProtein: account!.totalDailyProtein - protein,
      totalDailyCarbs: account!.totalDailyCarbs - carbs,
      totalDailyFats: account!.totalDailyFats - fats,
      calorieGoal: account!.calorieGoal,
      favorites: account!.favorites,
      meals: [
        ...account!.meals.slice(0, index),
        ...account!.meals.slice(index + 1),
      ],
    });
  };
  const setCalorieGoal = (calorieGoal: number): void => {
    setAccountInfo({
      _id: user?.uid,
      bodyType: account!.bodyType,
      totalDailyCalories: account!.totalDailyCalories,
      totalDailyProtein: account!.totalDailyProtein,
      totalDailyCarbs: account!.totalDailyCarbs,
      totalDailyFats: account!.totalDailyFats,
      calorieGoal: calorieGoal,
      favorites: [...account!.favorites],
      meals: account!.meals,
    });
  };
  const removeFavorite = (recipe: Recipe): void => {
    const index = account!.favorites.findIndex((r) => r.id === recipe.id);
    setAccountInfo({
      _id: user?.uid,
      bodyType: account!.bodyType,
      totalDailyCalories: account!.totalDailyCalories,
      totalDailyProtein: account!.totalDailyProtein,
      totalDailyCarbs: account!.totalDailyCarbs,
      totalDailyFats: account!.totalDailyFats,
      calorieGoal: account!.calorieGoal,
      favorites: [
        ...account!.favorites.slice(0, index),
        ...account!.favorites.slice(index + 1),
      ],
      meals: account!.meals,
    });
  };
  const setBodyType = (
    height: number,
    weight: number,
    age: number,
    sex: string
  ): void => {
    setAccountInfo({
      _id: account?._id,
      bodyType: {
        height,
        weight,
        age,
        sex,
      },
      totalDailyCalories: account!.totalDailyCalories,
      totalDailyProtein: account!.totalDailyProtein,
      totalDailyCarbs: account!.totalDailyCarbs,
      totalDailyFats: account!.totalDailyFats,
      calorieGoal: account!.calorieGoal,
      favorites: account!.favorites,
      meals: account!.meals,
    });
  };
  return (
    <AccountContext.Provider
      value={{
        account,
        addMacros,
        addFavorite,
        removeFavorite,
        setBodyType,
        setCalorieGoal,
        removeMeal,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
export default AccountContextProvider;
