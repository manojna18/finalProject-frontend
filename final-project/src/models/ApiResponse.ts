import Recipe from "./Recipe";

export interface ApiResponse {
  number: number;
  offset: number;
  results: Recipe[];
  totalResults: number;
}
