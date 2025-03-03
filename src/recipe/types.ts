export interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  strTags?: string;
  strSource?: string;
  [key: string]: string | undefined;
}

export interface ApiResponse {
  meals: RecipeDetail[] | null;
}


export interface RecipeTitleProps {
  id: string;
  name: string;
  category: string;
  area: string;
  image: string;
}


