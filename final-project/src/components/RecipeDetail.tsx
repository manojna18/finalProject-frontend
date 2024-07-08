import { useContext, useEffect, useState } from "react";
import "./css/RecipeDetail.css";
import { RecipeByID } from "../models/RecipeByID";
import { getByID, getNutritionInfo } from "../services/spoonacularApiService";
import NutrientInfo from "../models/NutrientInfo";
import UserContext from "../context/UserContext";

interface Props {
  id: number;
}

const RecipeDetail = ({ id }: Props) => {
  const [details, setDetails] = useState<RecipeByID>();
  const [nutriInfo, setNutriInfo] = useState<NutrientInfo>();
  const { user, addMacros } = useContext(UserContext);

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
  }, []);

  return (
    <>
      <div className="RecipeDetail">
        <p>Time to cook: {details?.readyInMinutes}</p>
        <p>Number of servings: {details?.servings} </p>
        <p></p>
        <a href={details?.sourceUrl} target="_blank" rel="noopener noreferrer">
          Link to the recipe
        </a>
        {details && (
          <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
        )}
        <p></p>
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
              nutriInfo!.nutrients.find((item) => item.name === "Fat")!.amount
            );
          }}
        >
          Add To Plate
        </button>
      </div>
    </>
  );
};

export default RecipeDetail;
