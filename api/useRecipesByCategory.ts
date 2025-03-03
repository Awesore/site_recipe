// api/useRecipesByCategory.ts
import { useState, useEffect } from "react";
import { Meal } from "./types";

const useRecipesByCategory = (selectedCategory: string) => {
  const [filteredRecipes, setFilteredRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      // If no category is selected, we return an empty array
      // The component will use the original recipes in this case
      if (!selectedCategory) {
        setFilteredRecipes([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
            selectedCategory,
          )}`,
        );
        const data = await response.json();

        if (!data.meals) {
          setFilteredRecipes([]);
          setLoading(false);
          return;
        }

        const mealIds = data.meals.map((meal: any) => meal.idMeal);

        if (mealIds.length > 0) {
          const detailedRecipes = await Promise.all(
            mealIds.map(async (id: string) => {
              const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
              );
              const data = await response.json();
              return data.meals[0];
            }),
          );
          setFilteredRecipes(detailedRecipes);
        } else {
          setFilteredRecipes([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error loading dishes by category:", err);
        setError("Failed to load dishes by category. Please try again.");
        setFilteredRecipes([]);
        setLoading(false);
      }
    };

    fetchRecipesByCategory();
  }, [selectedCategory]); // Only depends on selectedCategory now, not allRecipes

  return {
    filteredRecipes,
    loading,
    error,
    isFiltered: selectedCategory !== "",
  };
};

export default useRecipesByCategory;
