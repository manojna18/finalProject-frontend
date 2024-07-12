// import './CustomRecipe.css'

import { useContext } from "react";
import Recipe from "../models/Recipe";
import AccountContext from "../context/AccountContext";

interface Props {
  recipe: Recipe;
}

const CustomRecipe = ({ recipe }: Props) => {
  const { removeMeal } = useContext(AccountContext);

  const calories = recipe.nutritionInfo?.calories;
  const carbs = recipe.nutritionInfo?.carbs;
  const protein = recipe.nutritionInfo?.protein;
  const fat = recipe.nutritionInfo?.fats;

  return (
    <div className="CustomRecipe">
      <p>Calories: {calories}</p>
      <p>Carbohydrates: {carbs}</p>
      <p>Protein: {protein}</p>
      <p>Fat: {fat}</p>
      <button
        onClick={() =>
          removeMeal(+calories!, +protein!, +carbs!, +fat!, recipe)
        }
      >
        Remove meal
      </button>
    </div>
  );
};

export default CustomRecipe;
