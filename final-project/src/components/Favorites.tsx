import { useContext } from "react";
import "./css/Favorites.css";
import AccountContext from "../context/AccountContext";
import RecipeCard from "./RecipeCard";
import { useNavigate } from "react-router-dom";
import userContext from "../context/UserContext";

const Favorites = () => {
  const { account } = useContext(AccountContext);
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }

  return (
    <div className="Favorites">
      {account?.favorites.map((r) => (
        <RecipeCard recipe={r} />
      ))}
    </div>
  );
};

export default Favorites;
