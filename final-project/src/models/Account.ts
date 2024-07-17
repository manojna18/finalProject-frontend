import BodyType from "./BodyType";
import Day from "./Day";
import Recipe from "./Recipe";

export default interface Account {
  _id?: string;
  userId?: string;
  bodyType: BodyType;
  totalDailyCalories: number;
  totalDailyProtein: number;
  totalDailyCarbs: number;
  totalDailyFats: number;
  favorites: Recipe[];
  calorieGoal: number;
  meals: Day[];
  // addMacros(
  //   calories: number,
  //   protein: number,
  //   carbs: number,
  //   fats: number
  // ): void;
}
