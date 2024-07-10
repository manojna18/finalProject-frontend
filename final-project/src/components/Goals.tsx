import "./css/Goals.css";
import UserContext from "../context/UserContext";
import { FormEvent, useContext, useEffect, useState } from "react";
import AccountContext from "../context/AccountContext";

const Goals = () => {
  const [userHeight, setUserHeight] = useState<string>("");
  const [userWeight, setUserWeight] = useState<string>("");
  const [userAge, setUserAge] = useState<string>("");
  const [userSex, setUserSex] = useState("F");
  const [userExercise, setUserExercise] = useState("light");
  const [displayError, setDisplayError] = useState(false);
  const { user } = useContext(UserContext);
  const { account, setBodyType, setCalorieGoal } = useContext(AccountContext);

  const calculateCalorieGoal = (): number => {
    const offset: number = userSex === "F" ? -161 : 5;
    let height = +userHeight * 2.54;
    let weight = +userWeight / 2.205;
    const lightActivityLevel = 1.375;
    const moderateActivityLevel = 1.55;
    const veryActiveActivityLevel = 1.725;

    if (userExercise === "light") {
      return (
        +(height * 6.25 + 9.99 * weight - 4.92 * +userAge + offset).toFixed(2) *
        lightActivityLevel
      );
    } else if (userExercise === "moderate") {
      return (
        +(height * 6.25 + 9.99 * weight - 4.92 * +userAge + offset).toFixed(2) *
        moderateActivityLevel
      );
    } else if (userExercise === "active") {
      return (
        +(height * 6.25 + 9.99 * weight - 4.92 * +userAge + offset).toFixed(2) *
        veryActiveActivityLevel
      );
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    let height: number = +userHeight;
    let weight: number = +userWeight;
    let age: number = +userAge;
    if (height && weight && age) {
      await setBodyType(height, weight, age, userSex, calculateCalorieGoal());
      //setCalorieGoal(calculateCalorieGoal());
      //ProteinGoal = weight(in pounds) * 0.36
      //CarbGoal = .45 * calorieGoal
      //FatGoal = .3 * calorieGoal
      setDisplayError(false);
    } else {
      setDisplayError(true);
    }
    setUserHeight("");
    setUserWeight("");
    setUserAge("");
  };

  return (
    <div className="Goals">
      <h2>Goals</h2>
      <p>Calorie Goal: {account?.calorieGoal}</p>
      <p>Height: {account?.bodyType.height}</p>
      <p>Weight: {account?.bodyType.weight}</p>
      <p>Age: {account?.bodyType.age} </p>
      <p>Sex: {account?.bodyType.sex}`</p>
      <p>Current Calories: {account?.totalDailyCalories?.toFixed(2)}</p>
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
        <select
          name=""
          id="sex"
          onChange={(e) => {
            setUserSex(e.target.value);
          }}
        >
          <option value="F">Female</option>
          <option value="M">Male</option>
        </select>
        <label htmlFor="exercise">Exercise Level:</label>
        <select
          name=""
          id="exercise"
          onChange={(e) => {
            setUserExercise(e.target.value);
          }}
        >
          <option value="light">Light: sports 1-3 days​ a week</option>
          <option value="moderate">Moderate: sports 3-5 days​ a week</option>
          <option value="active">Active: sports 6-7 days a week</option>
        </select>
        <button>Submit</button>
      </form>
      <p
        className="error-message"
        style={{ display: displayError ? "block" : "none" }}
      >
        Error! Details must be in number format!
      </p>
    </div>
  );
};

export default Goals;
