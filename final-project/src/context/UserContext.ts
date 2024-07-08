import { createContext } from "react";
import User from "../models/User";
interface UserContextModel {
  user: User | null;
  addCalories(calories: number): void;
}
const defaultValues: UserContextModel = {
  user: null,
  addCalories: () => {},
};
const UserContext = createContext(defaultValues);
export default UserContext;
