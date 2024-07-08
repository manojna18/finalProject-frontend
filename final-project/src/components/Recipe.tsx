import { FormEvent, useContext, useEffect, useState } from "react";
import "./css/Recipe.css";
import { getByID, getRecipe } from "../services/spoonacularApiService";
import RecipeInterface from "../models/Recipe";
import RecipeCard from "./RecipeCard";
import UserContext from "../context/UserContext";

const Recipe = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [veganOnly, setVeganOnly] = useState(false);
  const [recipeList, setRecipeList] = useState<RecipeInterface[]>([]);
  const [currentCalories, setCurrentCalories] = useState<number>(0);
  const { user, addCalories } = useContext(UserContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getRecipe(searchTerm, veganOnly).then((res) => {
      setRecipeList(res.results);
      console.log(res);
    });
    setSearchTerm("");
  };

  return (
    <div className="Recipe">
      <p>{user?.totalDailyCalories}</p>
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
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipe;
