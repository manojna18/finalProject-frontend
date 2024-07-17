import axios from "axios";
import { RecipeByID } from "../models/RecipeByID.ts";
import { ApiResponse } from "../models/ApiResponse.ts";
import NutrientInfo from "../models/NutrientInfo.ts";

const baseRecipeUrl: string =
  import.meta.env.VITE_BASE_RECIPE_URL || "url is not imported";
const apiRecipeKey: string =
  import.meta.env.VITE_API_RECIPE_KEY || "api key not found";
const recipeByIdUrl: string =
  import.meta.env.VITE_URL_RECIPE_BY_ID || "url not imported";

export const getByID = (id: number): Promise<RecipeByID> => {
  return axios
    .get(`${recipeByIdUrl}/${id}/information`, {
      params: {
        apiKey: apiRecipeKey,
        includeNutrition: true,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getRecipe = (
  searchTerm: string,
  isVegan: boolean
): Promise<ApiResponse> => {
  return axios
    .get(`${baseRecipeUrl}`, {
      params: {
        includeIngredients: searchTerm,
        apiKey: apiRecipeKey,
        diet: isVegan ? "vegan" : "vegetarian",
        number: 3,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getNutritionInfo = (id: number): Promise<NutrientInfo> => {
  return axios
    .get(`${recipeByIdUrl}/${id}/nutritionWidget.json`, {
      params: {
        apiKey: apiRecipeKey,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
