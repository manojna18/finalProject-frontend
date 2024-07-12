import { FormEvent, useContext, useState } from "react";
import "./css/NutritionTracker.css";
import AccountContext from "../context/AccountContext";
import RecipeCard from "./RecipeCard";
import { Chart, ArcElement } from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import PieChart from "./PieChart";
import { FormEncType } from "react-router-dom";

Chart.register(ArcElement);

const NutritionTracker = () => {
  const { addMacros, account, clearAllMeals } = useContext(AccountContext);
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

  const clearMealsHandler = (): void => {
    clearAllMeals();
  };
  const [customName, setCustomName] = useState("");
  const [customCalories, setCustomCalories] = useState(0);
  const [customCarbs, setCustomCarbs] = useState(0);
  const [customProtein, setCustomProtein] = useState(0);
  const [customFat, setCustomFat] = useState(0);

  const addCustomMeal = (
    name: string,
    calories: number,
    protein: number,
    carbs: number,
    fat: number
  ) => {
    addMacros(calories, protein, carbs, fat, {
      title: name,
      id: Math.random() * 10000,
    });
  };
  return (
    <div className="NutritionTracker">
      <>
        <PieChart chartData={data} />
      </>
      <table>
        <tr>
          <th></th>
          <th>Calories</th>
          <th>Protein</th>
          <th>Carbs</th>
          <th>Fats</th>
        </tr>
        <tr>
          <td>Goals</td>
          <td>{account?.calorieGoal}</td>
          <td>{proteinLimitInGrams}</td>
          <td>{carbLimitInGrams}</td>
          <td>{fatLimitInGrams}</td>
        </tr>
        <tr>
          <td>Consumed</td>
          <td>{account?.totalDailyCalories?.toFixed(2)}</td>
          <td>{account?.totalDailyProtein?.toFixed(2)}</td>
          <td>{account?.totalDailyCarbs?.toFixed(2)}</td>
          <td>{account?.totalDailyFats?.toFixed(2)}</td>
        </tr>
      </table>

      <p>What I ate in a day</p>

      {/* Custom meal form */}
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          addCustomMeal(
            customName,
            customCalories,
            customProtein,
            customCarbs,
            customFat
          );
        }}
      >
        <p>Custom meal entry</p>
        <label htmlFor="">
          Name
          <input
            type="text"
            className="customName"
            onChange={(e) => {
              setCustomName(e.target.value);
            }}
          />
        </label>
        <label htmlFor="">
          Calories
          <input
            type="number"
            className="customCalories"
            value={customCalories}
            onChange={(e) => {
              setCustomCalories(+e.target.value);
            }}
          ></input>
        </label>
        <label htmlFor="">
          Protein
          <input
            type="number"
            className="customProtein"
            value={customProtein}
            onChange={(e) => {
              setCustomProtein(+e.target.value);
            }}
          ></input>
        </label>
        <label htmlFor="">
          Carbs
          <input
            type="text"
            className="customCarbs"
            value={customCarbs}
            onChange={(e) => {
              setCustomCarbs(+e.target.value);
            }}
          ></input>
        </label>
        <label htmlFor="">
          Fat
          <input
            type="number"
            className="customFat"
            value={customFat}
            onChange={(e) => {
              setCustomFat(+e.target.value);
            }}
          ></input>
        </label>
        <button>Submit</button>
      </form>
      <button onClick={clearMealsHandler}>Clear All Meals</button>
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
