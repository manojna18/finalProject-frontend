import axios from "axios";
import Ingredient from "../models/Ingredient";

const baseUrl: string = import.meta.env.VITE_BASE_URL || "url is not imported";
const apiKey: string = import.meta.env.VITE_API_KEY || "api key not found";
const appId: string = import.meta.env.VITE_APP_ID || "app id not found";

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
