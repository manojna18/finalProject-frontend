import "./css/Goals.css";
import UserContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";

const Goals = () => {
  const [userHeight, setUserHeight] = useState<string>("");
  const [userWeight, setUserWeight] = useState<string>("");
  const [userAge, setUserAge] = useState<string>("");
  const [calorieGoal, setCalorieGoal] = useState<number>(2000);
  const { user, addCalories } = useContext(UserContext);

  return (
    <div className="Goals">
      <h2>Goals</h2>
      <p>Calorie Goal: {calorieGoal}</p>
      <p>Current Calories: {user?.totalDailyCalories}</p>
      <p>Enter your details to track nutrition goals</p>
      <form>
        <label htmlFor="height">Height (in inch):</label>
        <input
          type="text"
          id="height"
          value={userHeight}
          onChange={(e) => setUserHeight(e.target.value)}
        />
        <label htmlFor="weight">Weight (in pounds):</label>
        <input
          type="text"
          id="weight"
          value={userWeight}
          onChange={(e) => setUserWeight(e.target.value)}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          value={userAge}
          onChange={(e) => setUserAge(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Goals;
