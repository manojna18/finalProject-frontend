import { useContext } from "react";
import "./css/NutritionTracker.css";
import AccountContext from "../context/AccountContext";
import RecipeCard from "./RecipeCard";
import { Chart, ArcElement } from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import PieChart from "./PieChart";

Chart.register(ArcElement);

const NutritionTracker = () => {
  const { account } = useContext(AccountContext);
  const calorieGoal = account!.calorieGoal;

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

  const carbsConsumedInCal = account?.totalDailyCarbs! * carbCaloriePerGram;
  const proteinConsumedInCal =
    account?.totalDailyProtein! * proteinCaloriePerGram;
  const fatConsumedInCal = account?.totalDailyFats! * fatCaloriePerGram;

  const data = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        label: "Calories",
        data: [proteinConsumedInCal, carbsConsumedInCal, fatConsumedInCal],
        backgroundColor: ["#00FF00", "#0000FF", "#FF0000"],
      },
    ],
    borderWidth: 0.5,
  };
  console.log(account?.meals);

  // const clearAllMeals = (): void => {
  //   account!.meals = [];
  // };

  return (
    <div className="NutritionTracker">
      <>
        <PieChart chartData={data} />
      </>
      <div>
        <p>Goals</p>
        <p>Calorie Goal: {account?.calorieGoal}</p>
        <p>Protein: {proteinLimitInGrams}</p>
        <p>Carbs: {carbLimitInGrams}</p>
        <p>Fats: {fatLimitInGrams}</p>
      </div>
      <p>Calories: {account?.totalDailyCalories?.toFixed(2)}</p>
      <p>Protein: {account?.totalDailyProtein?.toFixed(2)}</p>
      <p>Carbs: {account?.totalDailyCarbs?.toFixed(2)}</p>
      <p>Fats: {account?.totalDailyFats?.toFixed(2)}</p>

      <p>What I ate in a day</p>
      <button>Clear All Meals</button>
      {account?.meals.map((item) => {
        return <RecipeCard recipe={item} />;
      })}

      {account!.totalDailyCalories > calorieGoal && (
        <p className="warning">
          {" "}
          you have exceeded your calorie goal for a day
        </p>
      )}
      {account!.totalDailyProtein > proteinLimitInGrams && (
        <p className="warning">
          you have exceeded recommended protein amount for a day
        </p>
      )}
      {account!.totalDailyCarbs > carbLimitInGrams && (
        <p className="warning">
          you have exceeded recommended carbs amount for a day
        </p>
      )}
      {account!.totalDailyFats > fatLimitInGrams && (
        <p className="warning">
          you have exceeded recommended fats amount for a day
        </p>
      )}
    </div>
  );
};

export default NutritionTracker;
