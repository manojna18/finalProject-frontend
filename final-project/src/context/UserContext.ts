import { User } from "firebase/auth";
import { createContext } from "react";

interface UserContextModel {
  user: null | User;
}

const defaultValues: UserContextModel = {
  user: null,
};

const userContext = createContext(defaultValues);

export default userContext;
