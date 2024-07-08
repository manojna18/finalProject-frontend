import { ReactNode, useState } from "react";
import User from "../models/User";
import UserContext from "./UserContext";
interface Props {
  children: ReactNode;
}
const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>({
    _id: "",
    totalDailyCalories: 0,
    totalDailyCarbs: 0,
    totalDailyFats: 0,
    totalDailyProtein: 0,
  });
  const addMacros = (
    calories: number,
    protein: number,
    carbs: number,
    fats: number
  ) => {
    setUser({
      _id: user?._id,
      totalDailyCalories: user!.totalDailyCalories + calories,
      totalDailyCarbs: user!.totalDailyCarbs + carbs,
      totalDailyFats: user!.totalDailyFats + fats,
      totalDailyProtein: user!.totalDailyProtein + protein,
    });
  };
  return (
    <UserContext.Provider value={{ user, addMacros }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
