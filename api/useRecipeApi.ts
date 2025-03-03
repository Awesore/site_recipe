// api/useRecipeApi.ts
import { useState, useEffect } from "react";
import { Meal, ApiResponse } from "./types";

const useRecipeApi = () => {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [, setHasMore] = useState<boolean>(true);
  const alphabet: string = "abcdefghijklmnopqrstuvwxyz";

  // Automatically fetch the first page on initial load
  useEffect(() => {
    // Only fetch if we haven't fetched anything yet
    if (recipes.length === 0 && currentPage === 1) {
      fetchMoreRecipes();
    }
  }, []);

  const fetchMoreRecipes = async (): Promise<void> => {
    if (currentPage > alphabet.length) {
      setHasMore(false);
      return;
    }

    const letter: string = alphabet[currentPage - 1];
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
      );
      const data: ApiResponse = await response.json();

      if (data.meals) {
        // Ensure we don't add duplicate recipes
        const newRecipes = data.meals.filter(
          (newRecipe) =>
            !recipes.some(
              (existingRecipe) => existingRecipe.idMeal === newRecipe.idMeal,
            ),
        );

        setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
      }

      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to fetch recipes. Please try again.");
      setLoading(false);
    }
  };

  return {
    recipes,
    loading,
    error,
    fetchMoreRecipes,
    hasMore: currentPage <= alphabet.length,
  };
};

export default useRecipeApi;
