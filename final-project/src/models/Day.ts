import Recipe from "./Recipe";

export default interface Day {
    date: string;
    recipes: Recipe[];
    totalDailyCalories?: number;
    totalDailyProtein?: number;
    totalDailyCarbs?: number;
    totalDailyFats?: number;
}