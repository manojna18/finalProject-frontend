import { useEffect, useState } from "react";
import "./css/Home.css";
import Ingredient from "../models/Ingredient";
import { getIngredient, getRecipe } from "../services/edamamApiService";
import Recipe from "../models/Recipe";

const Home = () => {
  const dummyIngr: Ingredient = {
    // uri: "",
    foodId: "",
    foodCategory: "",
    weight: 0,
    calories: 5,
  };
  const [results, setResults] = useState<Ingredient>(dummyIngr);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  console.log(results);

  return <div className="Home"></div>;
};

export default Home;
