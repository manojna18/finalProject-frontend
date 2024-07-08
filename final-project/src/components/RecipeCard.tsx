import { useState } from "react";
import Recipe from "../models/Recipe";
import "./css/RecipeCard.css";
import RecipeDetail from "./RecipeDetail";
import { getByID } from "../services/spoonacularApiService";
import RecipeInterface from "../models/Recipe";

interface Prop {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Prop) => {
  const [detailBool, setDetailBool] = useState(false);

  const showItemDetails = (recipe: RecipeInterface) => {
    console.dir(recipe);
    setDetailBool(!detailBool);
    getByID(recipe.id).then((res) => {
      console.log(res);
    });
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
          {/* <input type="checkbox" onChange={}/> */}
        </label>
        <div className={detailBool ? "itemDetails" : "itemDetails hidden"}>
          <RecipeDetail id={recipe.id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
