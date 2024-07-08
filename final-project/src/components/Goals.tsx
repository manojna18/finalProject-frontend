import "./css/Goals.css";
import UserContext from "../context/UserContext";
import { FormEvent, useContext, useEffect, useState } from "react";

const Goals = () => {
  const [userHeight, setUserHeight] = useState<string>("");
  const [userWeight, setUserWeight] = useState<string>("");
  const [userAge, setUserAge] = useState<string>("");
  const [userSex, setUserSex] = useState("F");
  const [calorieGoal, setCalorieGoal] = useState<number>(2000);
  const [displayError, setDisplayError] = useState(false);
  const { user, setBodyType } = useContext(UserContext);

  const calculateCalorieGoal = (): number => {
    const offset: number = userSex === "F" ? -161 : 5;
    let height = (+userHeight * 2.54);
    let weight = +userWeight / 2.205;
    return +((height * 6.25) + (9.99 * weight) - (4.92 * +userAge) + offset).toFixed(2);
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    let height: number = +userHeight;
    let weight: number = +userWeight;
    let age: number = +userAge;
    if(height && weight && age) {
      setBodyType(height, weight, age, userSex);
      setCalorieGoal(calculateCalorieGoal());
      //ProteinGoal = weight(in pounds) * 0.36
      //CarbGoal = .45 * calorieGoal
      //FatGoal = .3 * calorieGoal
      setDisplayError(false);
    }else {
      setDisplayError(true);
    }
    setUserHeight("");
    setUserWeight("");
    setUserAge("");
  }

  return (
    <div className="Goals">
      <h2>Goals</h2>
      <p>Calorie Goal: {calorieGoal}</p>
      <p>{`Height: ${user?.bodyType.height} Weight: ${user?.bodyType.weight} Age: ${user?.bodyType.age} Sex: ${user?.bodyType.sex}`}</p>
      <p>Current Calories: {user?.totalDailyCalories}</p>
      <p>Enter your details to track nutrition goals</p>
      <form onSubmit={submitHandler}>
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
        <label htmlFor="sex">Sex:</label>
        <select name="" id="sex" onChange={(e) => {setUserSex(e.target.value)}}>
          <option value="F">Female</option>
          <option value="M">Male</option>
        </select>
        <button>Submit</button>
      </form>
      <p className="error-message" style={{display: displayError ? "block" : "none"}}>Error! Details must be in number format!</p>
    </div>
  );
};

export default Goals;
