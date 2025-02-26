import { useState } from "react";

export default function useSearchApi() {
  const [recipeList, setRecipeList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipe = async (query: string) => {
    if (!query) {
      setRecipeList([]);
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      const data = await response.json();
      const recipes = data.meals || [];
      setRecipeList(recipes);
      return recipes;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      setRecipeList([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { recipeList, isLoading, error, fetchRecipe };
}
