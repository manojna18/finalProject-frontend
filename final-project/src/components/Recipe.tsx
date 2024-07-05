import { FormEvent, useEffect, useState } from "react";
import "./css/Recipe.css";
import { getRecipe } from "../services/edamamApiService";
import RecipeInterface from "../models/Recipe";

const Recipe = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [veganOnly, setVeganOnly] = useState(false);
  const [recipeList, setRecipeList] = useState<RecipeInterface[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getRecipe(searchTerm, veganOnly).then((res) => {
      setRecipeList(res.results);
      console.log(res.results);
    });
    setSearchTerm("");
  };

  return (
    <div className="Recipe">
      <form onSubmit={(e) => handleSubmit(e)} id="search-form">
        <h3>Search for recipes with a keyword(eg: "avocado", "salad")</h3>
        <label htmlFor="search-bar">Enter a keyword</label>
        <input
          type="text"
          value={searchTerm}
          id="search-bar"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <label htmlFor="veg">Only show vegan recipes</label>
        <input
          type="checkbox"
          id="veg"
          onClick={() => setVeganOnly(!veganOnly)}
        />
        <button type="submit">Get Recipes</button>
      </form>
      <div className="recipes-container">
        {recipeList.map((recipe) => (
          <div className="recipe" key={recipe.id}>
            <h3>{recipe.title}</h3>
            {/* {recipe.ingredientLines.map((ing) => ( */}
            {/* <p>{ing}</p> */}
            {/* ))} */}
            {/* <p>Meal Type: {recipe.mealType}</p> */}
            <img src={recipe.image} />
            <button>Read more</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
