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
  const [userWeightGoal, setUserWeightGoal] = useState("maintain");
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

    const weightGoalOffset: number =
      userWeightGoal === "lose" ? -300 : userWeightGoal === "gain" ? +300 : 0;

    if (userExercise === "light") {
      return +(
        (height * 6.25 + 9.99 * weight - 4.92 * +userAge + offset) *
          lightActivityLevel +
        weightGoalOffset
      ).toFixed(2);
    } else if (userExercise === "moderate") {
      return +(
        (height * 6.25 + 9.99 * weight - 4.92 * +userAge + offset) *
          moderateActivityLevel +
        weightGoalOffset
      ).toFixed(2);
    } else {
      return +(
        (height * 6.25 + 9.99 * weight - 4.92 * +userAge + offset) *
          veryActiveActivityLevel +
        weightGoalOffset
      ).toFixed(2);
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
      <h2>Your Calorie Goal: {account?.calorieGoal}</h2>
      <p>
        {" "}
        <strong>Height:</strong> {account?.bodyType.height}
      </p>
      <p>
        {" "}
        <strong>Weight:</strong> {account?.bodyType.weight}
      </p>
      <p>
        {" "}
        <strong>Age:</strong> {account?.bodyType.age}{" "}
      </p>
      <p>
        {" "}
        <strong>Sex:</strong> {account?.bodyType.sex}
      </p>
      <p>
        {" "}
        <strong>Current Calories:</strong>{" "}
        {account?.totalDailyCalories?.toFixed(2)}
      </p>
      <h3>Enter your details to track nutrition goals</h3>
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
        <label htmlFor="weight-goal">Weith Goal:</label>
        <select
          name=""
          id="weight-goal"
          onChange={(e) => {
            setUserWeightGoal(e.target.value);
          }}
        >
          <option value="maintain">Maintain</option>
          <option value="lose">Lose</option>
          <option value="gain">Gain</option>
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
