import { ReactNode, useState } from "react";
import User from "../models/User";
import UserContext from "./userContext";
interface Props {
  children: ReactNode;
}
const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>({
    _id: "",
    totalDailyCalories: 0,
  });
  const addCalories = (calories: number) => {
    setUser({
      _id: user?._id,
      totalDailyCalories: user!.totalDailyCalories + calories,
    });
  };
  return (
    <UserContext.Provider value={{ user, addCalories }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
