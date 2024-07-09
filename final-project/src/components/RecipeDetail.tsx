import { useEffect, useState } from "react";
import "./css/RecipeDetail.css";
import { RecipeByID } from "../models/RecipeByID";
import { getByID, getNutritionInfo } from "../services/spoonacularApiService";
import NutrientInfo from "../models/NutrientInfo";

interface Props {
  id: number;
}

const RecipeDetail = ({ id }: Props) => {
  const [details, setDetails] = useState<RecipeByID>();
  const [nutriInfo, setNutriInfo] = useState<NutrientInfo>();

  useEffect(() => {
    getByID(id).then((res) => {
      setDetails(res);
    });

    getNutritionInfo(id).then((res) => {
      setNutriInfo(res);
    });
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
      </div>
    </>
  );
};

export default RecipeDetail;
