import { useContext } from "react";
import "./css/NutritionTracker.css";
import UserContext from "../context/UserContext";
import RecipeCard from "./RecipeCard";

const NutritionTracker = () => {
  const { user } = useContext(UserContext);
  const calorieGoal = user!.calorieGoal;

  //The calorie values per gram
  const proteinCaloriePerGram = 4;
  const carbCaloriePerGram = 4;
  const fatCaloriePerGram = 9;

  //Percentage limit
  const proteinLimitPercentage = 30;
  const carbLimitPercentage = 50;
  const fatLimitPercentage = 20;

  //Limit im grams
  const proteinLimitInGrams = +(
    (calorieGoal * (proteinLimitPercentage / 100)) /
    proteinCaloriePerGram
  ).toFixed(2);
  const carbLimitInGrams = +(
    (calorieGoal * (carbLimitPercentage / 100)) /
    carbCaloriePerGram
  ).toFixed(2);
  const fatLimitInGrams = +(
    (calorieGoal * (fatLimitPercentage / 100)) /
    fatCaloriePerGram
  ).toFixed(2);

  console.log(user?.meals);

  return (
    <div className="NutritionTracker">
      <div>
        <p>Goals</p>
        <p>Calorie Goal: {user?.calorieGoal}</p>
        <p>Protein: {proteinLimitInGrams}</p>
        <p>Carbs: {carbLimitInGrams}</p>
        <p>Fats: {fatLimitInGrams}</p>
      </div>

      <p>Calories: {user?.totalDailyCalories?.toFixed(2)}</p>
      <p>Protein: {user?.totalDailyProtein?.toFixed(2)}</p>
      <p>Carbs: {user?.totalDailyCarbs?.toFixed(2)}</p>
      <p>Fats: {user?.totalDailyFats?.toFixed(2)}</p>

      <p>What I ate in a day</p>
      {user?.meals.map((item) => {
        return <RecipeCard recipe={item} />;
      })}

      {user!.totalDailyCalories > calorieGoal && (
        <p className="warning">
          {" "}
          you have exceeded your calorie goal for a day
        </p>
      )}
      {user!.totalDailyProtein > proteinLimitInGrams && (
        <p className="warning">
          you have exceeded recommended protein amount for a day
        </p>
      )}
      {user!.totalDailyCarbs > carbLimitInGrams && (
        <p className="warning">
          you have exceeded recommended carbs amount for a day
        </p>
      )}
      {user!.totalDailyFats > fatLimitInGrams && (
        <p className="warning">
          you have exceeded recommended fats amount for a day
        </p>
      )}
    </div>
  );
};

export default NutritionTracker;
