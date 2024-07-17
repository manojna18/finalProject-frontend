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
import CustomRecipe from "./CustomRecipe";
import heart_regular from "../assets/heart-regular.svg";
import heart_solid from "../assets/heart-solid.svg";

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
      setFavorite(false);
    } else {
      addFavorite(recipe);
      setFavorite(true);
    }
  };

  useEffect(() => {
    if (!user) {
      setHidden(true);
      // navigate("/");
    } else {
      setFavorite(
        account?.favorites.find((item) => item.id === recipe.id) ? true : false
      );
      setHidden(false);
    }
  }, [user, account]);

  return (
    <div
      className="RecipeCard"
      style={{ height: detailBool ? "auto" : "400px" }}
    >
      <div
        className="recipe"
        key={recipe.id}
        style={{ height: detailBool ? "auto" : "450px" }}
      >
        <h3>{recipe.title}</h3>
        <img src={recipe.image} />
        <div className="recipe-options">
          <button
            className="readMoreButton"
            onClick={() => {
              showItemDetails(recipe);
            }}
          >
            {!detailBool ? "Read more" : "Close"}
          </button>
          {favorite ? (
            <img
              className="heart"
              src={heart_solid}
              onClick={favoriteHandler}
            />
          ) : (
            <img
              className="heart"
              src={heart_regular}
              onClick={favoriteHandler}
            />
          )}

          {/* <label htmlFor="" className={hidden ? "hidden" : ""}>
            Favorite
            <input
              type="checkbox"
              checked={favorite}
              onChange={favoriteHandler}
            />
          </label> */}
        </div>
        <div className={detailBool ? "itemDetails" : "itemDetails hidden"}>
          {!recipe.custom ? (
            <RecipeDetail id={recipe.id} recipe={recipe} />
          ) : (
            <CustomRecipe recipe={recipe} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
