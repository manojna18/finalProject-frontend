import { ReactNode, useState } from "react";
import UserContext from "./userContext";
import User from "../../models/User";
interface Props {
  children: ReactNode;
}
const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>({
    _id: "",
    totalDailyCalories: 0,
    totalDailyProtein: 0,
    totalDailyCarbs: 0,
    totalDailyFats: 0,
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
      totalDailyProtein: user!.totalDailyProtein + protein,
      totalDailyCarbs: user!.totalDailyCarbs + carbs,
      totalDailyFats: user!.totalDailyFats + fats,
    });
  };
  return (
    <UserContext.Provider value={{ user, addMacros }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
