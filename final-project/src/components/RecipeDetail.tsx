import { useEffect, useState } from "react";
import "./css/RecipeDetail.css";
import { RecipeByID } from "../models/RecipeByID";
import { getByID } from "../services/spoonacularApiService";
import he from "he";

interface Props {
  id: number;
}

const RecipeDetail = ({ id }: Props) => {
  const [details, setDetails] = useState<RecipeByID | null>(null);
  useEffect(() => {
    getByID(id).then((res) => {
      setDetails(res);
    });
  }, []);

  return (
    <div className="RecipeDetail">
      <p>Time to cook: {details?.readyInMinutes}</p>
      <p>Number of servings: {details?.servings} </p>
      <p></p>
      <a href={details?.sourceUrl} target="_blank" rel="noopener noreferrer">
        Link to the recipe
      </a>
      <p>{he.decode(details!.summary)}</p>
      <p></p>
    </div>
  );
};

export default RecipeDetail;
