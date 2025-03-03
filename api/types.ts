// api/types.ts - Shared types for all hooks
export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strInstructions?: string;
  strTags?: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
}

export interface ApiResponse {
  meals: Meal[] | null;
}

export interface CategoriesApiResponse {
  categories: Category[] | null;
}

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


