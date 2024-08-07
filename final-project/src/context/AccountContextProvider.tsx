import { ReactNode, useContext, useState } from "react";

import Recipe from "../models/Recipe";
import userContext from "./UserContext";
import Account from "../models/Account";
import AccountContext from "./AccountContext";
import {
  addAccount,
  editAccount,
  getAccountInfo,
} from "../services/accountApiService";
import Day from "../models/Day";
// import Recipe from "../components/Recipe";
interface Props {
  children: ReactNode;
}
const AccountContextProvider = ({ children }: Props) => {
  const { user } = useContext(userContext);
  const [account, setAccountInfo] = useState<Account | null>({
    bodyType: {
      height: 0,
      heightSmallerUnit: 0,
      weight: 0,
      age: 0,
      sex: "F",
      isImperial: false,
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

  const resetCalendar = async (): Promise<void> => {
    let meals: Day[] = [];
    let day = new Date();
    day.setDate(day.getDate() - 7);
    for (let i = 0; i < 7; i++) {
      day.setDate(day.getDate() + 1);
      meals.push({
        date: day.toLocaleDateString(),
        recipes: [],
        totalDailyCalories: 0,
        totalDailyCarbs: 0,
        totalDailyFats: 0,
        totalDailyProtein: 0,
      });
    }
    await editAccount({
      ...account!,
      meals: meals,
    });
    await updateAccount();
  };

  const addMacros = async (
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    recipe: Recipe
  ) => {
    if (account?.meals.length === 0) {
      await resetCalendar();
    }
    // resetCalendar()

    console.log(account?.meals);
    const index: number = account!.meals[6].recipes.findIndex((r) => {
      return r.id === recipe.id;
    });
    let meals: Day[] = [];

    if (account) {
      if (index === -1) {
        meals = [
          ...account.meals.slice(0, 6),
          {
            date: account.meals[6].date,
            recipes: [...account?.meals[6].recipes, { ...recipe, quantity: 1 }],
            totalDailyCalories: account.totalDailyCalories + calories,
            totalDailyCarbs: account.totalDailyCarbs + carbs,
            totalDailyFats: account.totalDailyFats + fats,
            totalDailyProtein: account.totalDailyProtein + protein,
          },
        ];
      } else {
        meals = [
          ...account.meals.slice(0, 6),
          {
            date: account.meals[6].date,
            recipes: [
              ...account.meals[6].recipes.slice(0, index),
              {
                ...account.meals[6].recipes[index],
                quantity: account!.meals[6].recipes[index].quantity! + 1,
              },
              ...account.meals[6].recipes.slice(index + 1),
            ],
            totalDailyCalories: account.totalDailyCalories + calories,
            totalDailyCarbs: account.totalDailyCarbs + carbs,
            totalDailyFats: account.totalDailyFats + fats,
            totalDailyProtein: account.totalDailyProtein + protein,
          },
        ];
      }
      await editAccount({
        ...account!,
        totalDailyCalories: account.totalDailyCalories + calories,
        totalDailyCarbs: account.totalDailyCarbs + carbs,
        totalDailyFats: account.totalDailyFats + fats,
        totalDailyProtein: account.totalDailyProtein + protein,
        meals: meals,
      });
      updateAccount();
    } else {
      console.log("No account found!");
    }
  };
  const addFavorite = async (recipe: Recipe): Promise<void> => {
    const duplicateRecipe = account?.favorites.find((r) => {
      return r.id === recipe.id;
    });
    if (duplicateRecipe) {
      return;
    }
    if (account) {
      await editAccount({
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
    if (account?.meals.length === 0) {
      resetCalendar();
    }
    const index = account!.meals[6].recipes.findIndex(
      (m) => m.id === recipe.id
    );
    if (index === -1) {
      return;
    }
    let meals: Day[] = [];

    if (account) {
      if (account.meals[6].recipes[index].quantity! > 1) {
        meals = [
          ...account.meals.slice(0, 6),
          {
            date: account.meals[6].date,
            recipes: [
              ...account.meals[6].recipes.slice(0, index),
              {
                ...account.meals[6].recipes[index],
                quantity: account!.meals[6].recipes[index].quantity! - 1,
              },
              ...account.meals[6].recipes.slice(index + 1),
            ],
            totalDailyCalories: account.totalDailyCalories - calories,
            totalDailyCarbs: account.totalDailyCarbs - carbs,
            totalDailyFats: account.totalDailyFats - fats,
            totalDailyProtein: account.totalDailyProtein - protein,
          },
        ];
      } else {
        meals = [
          ...account.meals.slice(0, 6),
          {
            date: account.meals[6].date,
            recipes: [
              ...account.meals[6].recipes.slice(0, index),
              ...account.meals[6].recipes.slice(index + 1),
            ],
            totalDailyCalories: account.totalDailyCalories - calories,
            totalDailyCarbs: account.totalDailyCarbs - carbs,
            totalDailyFats: account.totalDailyFats - fats,
            totalDailyProtein: account.totalDailyProtein - protein,
          },
        ];
      }
      await editAccount({
        ...account!,
        totalDailyCalories: account.totalDailyCalories - calories,
        totalDailyCarbs: account.totalDailyCarbs - carbs,
        totalDailyFats: account.totalDailyFats - fats,
        totalDailyProtein: account.totalDailyProtein - protein,
        meals: meals,
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
  const removeFavorite = async (recipe: Recipe): Promise<void> => {
    const index = account!.favorites.findIndex((r) => r.id === recipe.id);
    if (account) {
      await editAccount({
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

  const clearAllMeals = async (): Promise<void> => {
    if (account) {
      await editAccount({
        ...account,
        totalDailyCalories: 0,
        totalDailyCarbs: 0,
        totalDailyFats: 0,
        totalDailyProtein: 0,
        meals: [
          ...account.meals.slice(0, 6),
          {
            date: account.meals[6].date,
            recipes: [],
            totalDailyCalories: 0,
            totalDailyCarbs: 0,
            totalDailyFats: 0,
            totalDailyProtein: 0,
          },
        ],
      });
      updateAccount();
    } else {
      console.log("No account found");
    }
  };

  const setBodyType = async (
    height: number,
    heightSmallerUnit: number,
    weight: number,
    age: number,
    sex: string,
    calorieGoal: number,
    isImperial: boolean
  ): Promise<void> => {
    if (account) {
      await editAccount({
        ...account,
        bodyType: {
          height,
          heightSmallerUnit,
          weight,
          age,
          sex,
          isImperial,
        },
        calorieGoal: calorieGoal,
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
        clearAllMeals,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
export default AccountContextProvider;
