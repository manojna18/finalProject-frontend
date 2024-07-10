import { ReactNode, useContext, useState } from "react";

import account from "../models/Account";
import accountContext from "./AccountContext";
import Recipe from "../models/Recipe";
import userContext from "./UserContext";
import Account from "../models/Account";
import AccountContext from "./AccountContext";
import {
  addAccount,
  editAccount,
  getAccountInfo,
} from "../services/accountApiService";
// import Recipe from "../components/Recipe";
interface Props {
  children: ReactNode;
}
const AccountContextProvider = ({ children }: Props) => {
  const { user } = useContext(userContext);
  const [account, setAccountInfo] = useState<Account | null>({
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

  const createAccount = () => {
    addAccount({
      ...account!,
      userId: user?.uid,
    }).then((res) => {
      console.log(res);
      console.log(user!.uid);
      getAccountInfo(user!.uid).then((res) => {
        console.log(res);
        setAccountInfo(res);
      });
    });
  };

  const updateAccount = () => {
    console.log("updateAccount");
    if (account && account.userId && account._id) {
      // console.log(account)
      getAccountInfo(account.userId).then((res) => setAccountInfo(res));
    } else if (user && user.uid) {
      console.log(account);
      console.log(user);
      getAccountInfo(user.uid)
        .then((res) => {
          console.log(res);
          if (res && res._id) {
            console.log(res);
            setAccountInfo(res);
          } else {
            console.log(res);
            createAccount();
            console.log("Account created");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No account ID found!");
    }
  };

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
        totalDailyCalories: account.totalDailyCalories + calories,
        totalDailyCarbs: account.totalDailyCarbs + carbs,
        totalDailyFats: account.totalDailyFats + fats,
        totalDailyProtein: account.totalDailyProtein + protein,
        meals: [...account.meals, recipe],
      });
      updateAccount();
    } else {
      console.log("No account found!");
    }
  };
  const addFavorite = (recipe: Recipe): void => {
    if (account) {
      editAccount({
        ...account,
        favorites: [...account.favorites, recipe],
      });
      updateAccount();
    } else {
      console.log("No account found!");
    }
  };

  const removeMeal = async (
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    recipe: Recipe
  ): Promise<void> => {
    const index = account!.meals.findIndex((m) => m.id === recipe.id);
    if (account) {
      await editAccount({
        ...account!,
        totalDailyCalories: account.totalDailyCalories - calories,
        totalDailyCarbs: account.totalDailyCarbs - carbs,
        totalDailyFats: account.totalDailyFats - fats,
        totalDailyProtein: account.totalDailyProtein - protein,
        meals: [
          ...account.meals.slice(0, index),
          ...account.meals.slice(index + 1),
        ],
      });
      updateAccount();
    } else {
      console.log("No account found!");
    }
  };
  const setCalorieGoal = async (calorieGoal: number): Promise<void> => {
    if (account) {
      await editAccount({
        ...account,
        calorieGoal: calorieGoal,
      });
      updateAccount();
    } else {
      console.log("No account found!");
    }
  };
  const removeFavorite = (recipe: Recipe): void => {
    const index = account!.favorites.findIndex((r) => r.id === recipe.id);
    if (account) {
      editAccount({
        ...account,
        favorites: [
          ...account.favorites.slice(0, index),
          ...account.favorites.slice(index + 1),
        ],
      });
      updateAccount();
    } else {
      console.log("No account found!");
    }
  };
  const setBodyType = async (
    height: number,
    weight: number,
    age: number,
    sex: string
  ): Promise<void> => {
    if (account) {
      await editAccount({
        ...account,
        bodyType: {
          height,
          weight,
          age,
          sex,
        },
      });
      updateAccount();
    } else {
      console.log("No account found!");
    }
  };
  return (
    <AccountContext.Provider
      value={{
        account,
        updateAccount,
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
