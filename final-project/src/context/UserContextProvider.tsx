import { ReactNode, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface Props {
  children: ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user: user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
