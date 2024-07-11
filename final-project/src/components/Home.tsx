import { useEffect, useState } from "react";
import "./css/Home.css";
// import Ingredient from "../models/Ingredient";
// import { getIngredient, getRecipe } from "../services/spoonacularApiService";
// import Recipe from "../models/Recipe";
import cow from "../assets/cow.png";
import { Link } from "react-router-dom";

const Home = () => {
  // const dummyIngr: Ingredient = {
  //   // uri: "",
  //   foodId: "",
  //   foodCategory: "",
  //   weight: 0,
  //   calories: 5,
  // };
  // const [results, setResults] = useState<Ingredient>(dummyIngr);
  // const [recipes, setRecipes] = useState<Recipe[]>([]);

  // console.log(results);

  return (
    <div className="Home">
      <div id="cow-container">
        <img src={cow} className="home-img" />
      </div>
      <h1>
        Less meat and more plants on your plates{" "}
        <a href="https://www.oxfordmartin.ox.ac.uk/news/201603-plant-based-diets">
          saves lives
        </a>{" "}
        and the environment!
      </h1>
      <h3>If you need some vegan recipes, let us help!</h3>
      <Link to="/recipes/:id">
        <button>Find my next meal</button>
      </Link>
    </div>
  );
};

export default Home;
