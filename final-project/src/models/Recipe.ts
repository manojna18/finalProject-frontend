// export default interface Recipe {
//     id: string;
//     title:	string;
//     image:	string;
//     imageType:	string;
//     source:	string;
//     url:	string;
//     shareAs:	string;
//     yield:	number;
//     dietLabels:	string[];
//     healthLabels:	string[];
//     cautions:	string[];
//     ingredientLines:	string[];
//     ingredients:	[];
//     calories:	number;
//     glycemicIndex:	number;
//     inflammatoryIndex:	number;
//     totalCO2Emissions:	number;
//     co2EmissionsClass:	string;
//     totalWeight:	number;
//     cuisineType:	string [];
//     mealType:	string [];
//     dishType:	string [];
//     instructions:	[];
//     tags:	[];
//     externalId:	string;
//     totalNutrients:	{};
//     totalDaily:	{};
//     digest:	{};
// }

export default interface Recipe {
  id: number;
  title: string;
  image?: string;
  imageType?: string;
  custom?: boolean;
  nutritionInfo?: {
    calories: string;
    carbs: string;
    protein: string;
    fats: string;
    fiber?: string;
  };
  quantity?: number;
}
