import { createContext } from "react";
import User from "../../models/User";
interface UserContextModel {
  user: User | null;
  addMacros(
    calories: number,
    protein: number,
    carbs: number,
    fats: number
  ): void;
}
const defaultValues: UserContextModel = {
  user: null,
  addMacros: () => {},
};
const UserContext = createContext(defaultValues);
export default UserContext;
