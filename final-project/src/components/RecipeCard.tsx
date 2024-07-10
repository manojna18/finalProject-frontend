import { useContext, useEffect, useState } from "react";
import Recipe from "../models/Recipe";
import "./css/RecipeCard.css";
import RecipeDetail from "./RecipeDetail";
import { getByID } from "../services/spoonacularApiService";
import RecipeInterface from "../models/Recipe";
import AccountContext from "../context/AccountContext";
import { addAccount } from "../services/accountApiService";
import userContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

interface Prop {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Prop) => {
  const [detailBool, setDetailBool] = useState(false);
  const { account, addFavorite, removeFavorite } = useContext(AccountContext);
  const [favorite, setFavorite] = useState(
    account?.favorites.find((item) => item.id === recipe.id) ? true : false
  );
  const { user } = useContext(userContext);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  const showItemDetails = (recipe: RecipeInterface) => {
    console.dir(recipe);
    setDetailBool(!detailBool);
    // getByID(recipe.id).then((res) => {
    //   console.log(res);
    // });
  };

  const favoriteHandler = () => {
    if (favorite) {
      removeFavorite(recipe);
    } else {
      addFavorite(recipe);

      console.log();
    }
    setFavorite(!favorite);
  };

  useEffect(() => {
    if (!user) {
      setHidden(true);
      navigate("/");
    } else {
      setHidden(false);
    }
  }, [user]);

  return (
    <div className="RecipeCard">
      <div className="recipe" key={recipe.id}>
        <h3>{recipe.title}</h3>
        <img src={recipe.image} />
        <button
          className="readMoreButton"
          onClick={() => {
            showItemDetails(recipe);
          }}
        >
          Read more
        </button>

        <label htmlFor="" className={hidden ? "hidden" : ""}>
          Favorite
          <input
            type="checkbox"
            checked={favorite}
            onChange={favoriteHandler}
          />
        </label>
        <div className={detailBool ? "itemDetails" : "itemDetails hidden"}>
          <RecipeDetail id={recipe.id} recipe={recipe} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
