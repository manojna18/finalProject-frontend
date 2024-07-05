import axios from "axios";
import Ingredient from "../models/Ingredient";
import RecipeResponse from "../models/RecipeResponse";

const baseUrl: string = import.meta.env.VITE_BASE_URL || "url is not imported";
const apiKey: string = import.meta.env.VITE_API_KEY || "api key not found";
const appId: string = import.meta.env.VITE_APP_ID || "app id not found";
const baseRecipeUrl: string =
  import.meta.env.VITE_BASE_RECIPE_URL || "url is not imported";
const apiRecipeKey: string =
  import.meta.env.VITE_API_RECIPE_KEY || "api key not found";
//const appRecipeId: string =
//import.meta.env.VITE_APP_RECIPE_ID || "app id not found";

export const getIngredient = (ingr: string): Promise<Ingredient> => {
  return axios
    .get(`${baseUrl}`, {
      params: {
        app_key: apiKey,
        app_id: appId,
        ingr: ingr,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getRecipe = (
  searchTerm: string,
  isVegan: boolean
): Promise<RecipeResponse> => {
  return axios
    .get(`${baseRecipeUrl}`, {
      params: {
        includeIngredients: searchTerm,
        apiKey: apiRecipeKey,
        diet: isVegan ? "vegan" : "vegetarian",
        number: 20,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
