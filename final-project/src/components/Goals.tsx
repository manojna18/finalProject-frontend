import "./css/Goals.css";
import { FormEvent, useContext, useState } from "react";
import AccountContext from "../context/AccountContext";

const Goals = () => {
  const [userHeight, setUserHeight] = useState<string>("");
  const [userHeightSmallerUnit, setUserHeightSmallerUnit] =
    useState<string>("");
  const [userHeightLargerUnit, setUserHeightLargerUnit] = useState<string>("");
  const [isImperial, setIsImperial] = useState(false);
  const [userWeight, setUserWeight] = useState<string>("");
  const [userAge, setUserAge] = useState<string>("");
  const [userSex, setUserSex] = useState("F");
  const [userExercise, setUserExercise] = useState("light");
  const [userWeightGoal, setUserWeightGoal] = useState("maintain");
  const [displayError, setDisplayError] = useState(false);
  // const { user } = useContext(UserContext);
  const { account, setBodyType, setCalorieGoal } = useContext(AccountContext);

  const calculateCalorieGoal = (): number => {
    let height = 0;
    let weight = +userWeight;
    const lightActivityLevel = 1.375;
    const moderateActivityLevel = 1.55;
    const veryActiveActivityLevel = 1.725;
    if (isImperial) {
      console.log(userHeight);
      height = +userHeightLargerUnit * 12 + +userHeightSmallerUnit;
    } else {
      height = +userHeightLargerUnit * 100 + +userHeightSmallerUnit;
    }
    let bmr = 0;
    if (isImperial) {
      height = height * 2.54;
      weight = +userWeight * 0.453582;
    }

    if (userSex === "M") {
      bmr = 13.397 * weight + 4.799 * height - 5.677 * +userAge + 88.362;
      console.log("H: " + height + " W: " + weight);
    } else if (userSex === "F") {
      bmr = 447.593 + 9.247 * +weight + 3.098 * +height - 4.33 * +userAge;
    }

    console.log(bmr);

    const weightGoalOffset: number =
      userWeightGoal === "lose" ? -300 : userWeightGoal === "gain" ? +300 : 0;

    if (userExercise === "light") {
      return +(bmr * lightActivityLevel + weightGoalOffset).toFixed(2);
    } else if (userExercise === "moderate") {
      return +(bmr * moderateActivityLevel + weightGoalOffset).toFixed(2);
    } else {
      return +(bmr * veryActiveActivityLevel + weightGoalOffset).toFixed(2);
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    let height: string = "";
    if (isImperial) {
      console.log(userHeight);
      height = (+userHeightLargerUnit * 12 + +userHeightSmallerUnit).toString();
    } else {
      height = (
        +userHeightLargerUnit * 100 +
        +userHeightSmallerUnit
      ).toString();
    }
    console.log(userHeight);
    setUserHeight(height);
    console.log(height);
    let weight: number = +userWeight;
    let age: number = +userAge;
    if (height && weight && age) {
      await setBodyType(+height, weight, age, userSex, calculateCalorieGoal());
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

  console.log(userHeight);
  return (
    <div className="Goals">
      <div className="user-details">
        <h2>Your Calorie Goal: {account?.calorieGoal} kcal</h2>
        <p>
          {" "}
          <strong>Height:</strong>{" "}
          {isImperial
            ? `${account?.bodyType.height! * 0.083} ft`
            : `${account?.bodyType.weight!} cm`}
        </p>
        <p>
          {" "}
          <strong>Weight:</strong>{" "}
          {isImperial
            ? `${account?.bodyType.weight} lbs`
            : `${account?.bodyType.weight} kg`}
        </p>
        <p>
          {" "}
          <strong>Age:</strong> {account?.bodyType.age} yrs
        </p>
        <p>
          {" "}
          <strong>Sex:</strong> {account?.bodyType.sex}
        </p>
        <p>
          {" "}
          <strong>Current Calories:</strong>{" "}
          {`${account?.totalDailyCalories?.toFixed(2)} kcal`}
        </p>
      </div>

      <h3>Enter your details to track nutrition goals</h3>

      <form onSubmit={submitHandler}>
        <div className="radio-btns">
          <label htmlFor="metric">
            Metric
            <input
              type="radio"
              name="measurement"
              value="metric"
              id="metric"
              onClick={() => {
                setIsImperial(false);
              }}
            ></input>
          </label>
          <label htmlFor="imperial">
            Imperial
            <input
              type="radio"
              name="measurement"
              value="imperial"
              id="imperial"
              onClick={() => {
                setIsImperial(true);
              }}
            ></input>
          </label>
        </div>

        {isImperial ? (
          <label htmlFor="heightLarge">Height ft:</label>
        ) : (
          <label htmlFor="heightLarge">Height in meters </label>
        )}
        <input
          required
          type="text"
          id="heightLarge"
          value={userHeightLargerUnit}
          onChange={(e) => setUserHeightLargerUnit(e.target.value)}
        />
        {isImperial ? (
          <label htmlFor="height">in:</label>
        ) : (
          <label htmlFor="height">cm:</label>
        )}
        <input
          required
          type="text"
          id="height"
          value={userHeightSmallerUnit}
          onChange={(e) => setUserHeightSmallerUnit(e.target.value)}
        />
        {isImperial ? (
          <label htmlFor="weight">Weight (in pounds):</label>
        ) : (
          <label htmlFor="weight">Weight (in kilograms):</label>
        )}
        <input
          required
          type="text"
          id="weight"
          value={userWeight}
          onChange={(e) => setUserWeight(e.target.value)}
        />
        <label htmlFor="age">Age:</label>
        <input
          required
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
        <label htmlFor="weight-goal">Weight Goal:</label>
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
