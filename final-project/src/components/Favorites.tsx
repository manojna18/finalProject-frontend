import { useContext } from "react";
import "./css/Favorites.css";
import AccountContext from "../context/AccountContext";
import RecipeCard from "./RecipeCard";
import { addAccount } from "../services/accountApiService";

const Favorites = () => {
  const { account } = useContext(AccountContext);
  return (
    <div className="Favorites">
      {account?.favorites.map((r) => (
        <RecipeCard recipe={r} />
      ))}
    </div>
  );
};

export default Favorites;
