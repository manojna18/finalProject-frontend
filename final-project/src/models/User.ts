export default interface User {
  _id?: string;
  totalDailyCalories: number;
  totalDailyProtein: number;
  totalDailyCarbs: number;
  totalDailyFats: number;
  // addMacros(
  //   calories: number,
  //   protein: number,
  //   carbs: number,
  //   fats: number
  // ): void;
}
