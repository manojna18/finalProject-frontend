import { useEffect, useState } from "react";
import "./css/Home.css";
import Ingredient from "../models/Ingredient";
import { getIngredient } from "../services/edamamApiService";

const Home = () => {
  const dummyIngr: Ingredient = {
    // uri: "",
    foodId: "",
    foodCategory: "",
    weight: 0,
    calories: 5,
  };
  const [results, setResults] = useState<Ingredient>(dummyIngr);

  useEffect(() => {
    getIngredient("spinach").then((res) => {
      setResults(res);
      console.log(res);
    });
  }, []);

  return <div className="Home">{results.calories}</div>;
};

export default Home;
