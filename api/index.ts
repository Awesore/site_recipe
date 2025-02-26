import { useState, useEffect } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strInstructions?: string;
  strTags?: string;
}

interface ApiResponse {
  meals: Meal[] | null;
}

const useRecipeApi = () => {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const alphabet: string = "abcdefghijklmnopqrstuvwxyz";

  const fetchRecipes = async (): Promise<void> => {
    if (currentPage > alphabet.length) return;

    const letter: string = alphabet[currentPage - 1];
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
      );
      const data: ApiResponse = await response.json();

      if (data.meals) {
        setRecipes((prevRecipes) => [...prevRecipes, ...data.meals!]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to fetch recipes. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [currentPage]);

  return {
    recipes,
    loading,
    error,
    fetchMoreRecipes: () => setCurrentPage((prevPage) => prevPage + 1),
    hasMore: currentPage <= alphabet.length,
  };
};

export default useRecipeApi;
