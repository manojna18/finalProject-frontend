import Recipe from "./Recipe";

interface Hit {
    recipe: Recipe;
    _links: {};
}

export default interface RecipeResponse {
    from: number;
    to:	number;
    count: number;
    _links:	string[];
    hits: Hit[];
}