interface Nutrients {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export default interface NutrientInfo {
  nutrients: Nutrients[];
  caloricBreakdown: {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
  };
  weightPerServing: {
    amount: number;
    unit: string;
  };
}
