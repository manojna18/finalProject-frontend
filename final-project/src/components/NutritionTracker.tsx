import { useContext } from "react";
import "./css/NutritionTracker.css";
import AccountContext from "../context/AccountContext";
import RecipeCard from "./RecipeCard";
import { Chart, ArcElement } from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import PieChart from "./PieChart";

Chart.register(ArcElement);

const NutritionTracker = () => {
  const { user } = useContext(AccountContext);
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

  const carbsConsumedInCal = user?.totalDailyCarbs! * carbCaloriePerGram;
  const proteinConsumedInCal = user?.totalDailyProtein! * proteinCaloriePerGram;
  const fatConsumedInCal = user?.totalDailyFats! * fatCaloriePerGram;

  const data = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        label: "Calories",
        data: [proteinConsumedInCal, carbsConsumedInCal, fatConsumedInCal],
        backgroundColor: ["#FF0000", "#0000FF", "#00FF00"],
      },
    ],
    borderWidth: 0.5,
  };
  console.log(user?.meals);

  return (
    <div className="NutritionTracker">
      <>
        <PieChart chartData={data} />
      </>
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
