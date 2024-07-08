import { useState } from "react";
import "./css/Goals.css";

const Goals = () => {
  const [userHeight, setUserHeight] = useState<string>("");
  const [userWeight, setUserWeight] = useState<string>("");
  const [userAge, setUserAge] = useState<string>("");

  return (
    <div className="Goals">
      <h2>Goals</h2>
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
