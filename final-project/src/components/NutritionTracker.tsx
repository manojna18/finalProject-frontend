import { FormEvent, useContext, useState } from "react";
import "./css/NutritionTracker.css";
import AccountContext from "../context/AccountContext";
import RecipeCard from "./RecipeCard";
import { Chart, ArcElement } from "chart.js/auto";
import PieChart from "./PieChart";
import Accordion from "./Accordion";

Chart.register(ArcElement);

const NutritionTracker = () => {
  const { addMacros, account, clearAllMeals } = useContext(AccountContext);
  const [customName, setCustomName] = useState("");
  const [customCalories, setCustomCalories] = useState("");
  const [customCarbs, setCustomCarbs] = useState("");
  const [customProtein, setCustomProtein] = useState("");
  const [customFat, setCustomFat] = useState("");
  const [showForm, setShowForm] = useState(false);
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
        backgroundColor: ["#50d4a5", "#bb641d", "#EDE8D0"],
      },
    ],
    borderWidth: 0.5,
  };
  console.log(account?.meals);

  const clearMealsHandler = (): void => {
    clearAllMeals();
  };

  const addCustomMeal = (
    name: string,
    calories: string,
    protein: string,
    carbs: string,
    fat: string
  ) => {
    addMacros(+calories, +protein, +carbs, +fat, {
      title: name,
      id: Math.random() * 10000,
      custom: true,
      nutritionInfo: {
        calories,
        carbs,
        protein,
        fats: fat,
      },
    });
  };
  return (
    <div className="NutritionTracker">
      <div className="nutrition-charts">
        <div className="chart-holder">
          <PieChart chartData={data} />
        </div>

        <table className="nutrition-table">
          <tr>
            <th></th>
            <th>Calories</th>
            <th>Protein</th>
            <th>Carbs</th>
            <th>Fats</th>
          </tr>
          <tr>
            <td className="label">Goals</td>
            <td>{account?.calorieGoal} kcal</td>
            <td>{proteinLimitInGrams} g</td>
            <td>{carbLimitInGrams} g</td>
            <td>{fatLimitInGrams} g</td>
          </tr>
          <tr>
            <td className="label">Consumed</td>
            <td>{account?.totalDailyCalories?.toFixed(2)} kcal</td>
            <td>{account?.totalDailyProtein?.toFixed(2)} g</td>
            <td>{account?.totalDailyCarbs?.toFixed(2)} g</td>
            <td>{account?.totalDailyFats?.toFixed(2)} g</td>
          </tr>
        </table>
      </div>
      <section className="warnings-btns">
        <div className="warnings">
          {account!.totalDailyCalories > calorieGoal && (
            <p className="warning">
              {" "}
              You have exceeded your daily recommended calories!
            </p>
          )}
          {account!.totalDailyProtein > proteinLimitInGrams && (
            <p className="warning">
              You have exceeded your daily recommended protein!
            </p>
          )}
          {account!.totalDailyCarbs > carbLimitInGrams && (
            <p className="warning">
              You have exceeded your daily recommended carbs!
            </p>
          )}
          {account!.totalDailyFats > fatLimitInGrams && (
            <p className="warning">
              You have exceeded your daily recommended fats!
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Hide form" : "Add custom meal"}
        </button>
        <form
          style={{ display: showForm ? "flex" : "none" }}
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
          className="custom-meal-form"
        >
          <h3>Custom meal entry</h3>
          <label htmlFor="customName">
            Name
            <input
              type="text"
              id="customName"
              onChange={(e) => {
                setCustomName(e.target.value);
              }}
            />
          </label>
          <label htmlFor="customCalories">
            Calories
            <input
              type="number"
              id="customCalories"
              value={customCalories}
              onChange={(e) => {
                setCustomCalories(e.target.value);
              }}
            ></input>
          </label>
          <label htmlFor="customProtein">
            Protein
            <input
              type="number"
              id="customProtein"
              value={customProtein}
              onChange={(e) => {
                setCustomProtein(e.target.value);
              }}
            ></input>
          </label>
          <label htmlFor="customCarbs">
            Carbs
            <input
              type="text"
              id="customCarbs"
              value={customCarbs}
              onChange={(e) => {
                setCustomCarbs(e.target.value);
              }}
            ></input>
          </label>
          <label htmlFor="customFat">
            Fat
            <input
              type="number"
              id="customFat"
              value={customFat}
              onChange={(e) => {
                setCustomFat(e.target.value);
              }}
            ></input>
          </label>
          <button>Submit</button>
        </form>
        <button onClick={clearMealsHandler} className="clear-meal-btn">
          Clear All Meals
        </button>
      </section>
      <div className="plate">
        <Accordion />
        {/* {account?.meals.map((item) => {
          return (
            // <div className="nutrition-recipe-div" key={item.id}>
            //   <RecipeCard recipe={item} />{" "}
            //   <p className="quantity">{item.quantity}</p>
            // </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default NutritionTracker;
