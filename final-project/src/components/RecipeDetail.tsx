import { useContext, useEffect, useState } from "react";
import "./css/RecipeDetail.css";
import { RecipeByID } from "../models/RecipeByID";
import { getByID, getNutritionInfo } from "../services/spoonacularApiService";
import NutrientInfo from "../models/NutrientInfo";
import AccountContext from "../context/AccountContext";
import Recipe from "../models/Recipe";
import userContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  recipe: Recipe;
}

const RecipeDetail = ({ id, recipe }: Props) => {
  const [details, setDetails] = useState<RecipeByID>();
  const [nutriInfo, setNutriInfo] = useState<NutrientInfo>();
  const { account, addMacros, removeMeal } = useContext(AccountContext);
  const [meals, setMeals] = useState<Recipe[]>([]);
  const { user } = useContext(userContext);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    console.log("hi");
    if (!ignore) {
      getByID(id).then((res) => {
        console.log(res);
        setDetails(res);
      });

      getNutritionInfo(id).then((res) => {
        console.log(res);
        setNutriInfo(res);
      });
    }
    if (!user) {
      setDisabled(true);
      //navigate("/");
    } else {
      setDisabled(false);
    }
  }, [user]);

  return (
    <>
      <div className="RecipeDetail">
        <p className="recipe-deets">Time to cook: {details?.readyInMinutes}</p>
        <p className="recipe-deets">Number of servings: {details?.servings} </p>
        <a
          href={details?.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Link to the recipe
        </a>
        {details && (
          <p
            dangerouslySetInnerHTML={{ __html: details.summary }}
            className="excerpt"
          ></p>
        )}
      </div>
      <div className="nutrient-info">
        <h4>Macros</h4>
        <p>
          Calories:{" "}
          {`${
            nutriInfo?.nutrients.find((item) => item.name === "Calories")
              ?.amount
          }${
            nutriInfo?.nutrients.find((item) => item.name === "Calories")?.unit
          }`}
        </p>
        <p>
          Carbohydrates:{" "}
          {`${
            nutriInfo?.nutrients.find((item) => item.name === "Carbohydrates")
              ?.amount
          }${
            nutriInfo?.nutrients.find((item) => item.name === "Carbohydrates")
              ?.unit
          }`}
        </p>
        <p>
          Protein:{" "}
          {`${
            nutriInfo?.nutrients.find((item) => item.name === "Protein")?.amount
          }${
            nutriInfo?.nutrients.find((item) => item.name === "Protein")?.unit
          }`}
        </p>
        <p>
          Fat:
          {`${
            nutriInfo?.nutrients.find((item) => item.name === "Fat")?.amount
          }${nutriInfo?.nutrients.find((item) => item.name === "Fat")?.unit}`}
        </p>
        <p>
          Fiber:{" "}
          {`${
            nutriInfo?.nutrients.find((item) => item.name === "Fiber")?.amount
          }${nutriInfo?.nutrients.find((item) => item.name === "Fiber")?.unit}`}
        </p>
        {/* ADD TO PLATE BUTTON */}
        <button
          className="addToPlateBtn"
          onClick={() => {
            addMacros(
              nutriInfo!.nutrients.find((item) => item.name === "Calories")!
                .amount,
              nutriInfo!.nutrients.find((item) => item.name === "Protein")!
                .amount,
              nutriInfo!.nutrients.find(
                (item) => item.name === "Carbohydrates"
              )!.amount,
              nutriInfo!.nutrients.find((item) => item.name === "Fat")!.amount,
              recipe
            );
          }}
          disabled={disabled}
          title="Sign in with Google"
        >
          Add To Plate
        </button>
        <button
          className="RemoveFromPlateBtn"
          onClick={() => {
            removeMeal(
              nutriInfo!.nutrients.find((item) => item.name === "Calories")!
                .amount,
              nutriInfo!.nutrients.find((item) => item.name === "Protein")!
                .amount,
              nutriInfo!.nutrients.find(
                (item) => item.name === "Carbohydrates"
              )!.amount,
              nutriInfo!.nutrients.find((item) => item.name === "Fat")!.amount,
              recipe
            );
          }}
          disabled={disabled}
          title="Sign in with Google"
        >
          Remove from Plate
        </button>
      </div>
    </>
  );
};

export default RecipeDetail;
