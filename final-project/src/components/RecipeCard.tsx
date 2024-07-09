import { useContext, useState } from "react";
import Recipe from "../models/Recipe";
import "./css/RecipeCard.css";
import RecipeDetail from "./RecipeDetail";
import { getByID } from "../services/spoonacularApiService";
import RecipeInterface from "../models/Recipe";
import UserContext from "../context/UserContext";

interface Prop {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Prop) => {
  const [detailBool, setDetailBool] = useState(false);
  const { user, addFavorite, removeFavorite } = useContext(UserContext);
  const [favorite, setFavorite] = useState(
    user?.favorites.find((item) => item.id === recipe.id) ? true : false
  );

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
    }
    setFavorite(!favorite);
  };

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

        <label htmlFor="">
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
