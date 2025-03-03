// api/useRecipeDetails.ts
import { useState, useEffect } from "react";
import { Meal, ApiResponse } from "./types";

const useRecipeDetails = (recipeId: string | null) => {
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!recipeId) return;

    const fetchRecipeDetails = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
        );
        const data: ApiResponse = await response.json();

        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError("Recipe not found");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError("Failed to fetch recipe details. Please try again.");
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  return { recipe, loading, error };
};

export default useRecipeDetails;
