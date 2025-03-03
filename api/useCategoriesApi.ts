// api/useCategoriesApi.ts
import { useState, useEffect } from "react";
import { Category, CategoriesApiResponse } from "./types";

const useCategoriesApi = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php",
      );
      const data: CategoriesApiResponse = await response.json();

      if (data.categories) {
        setCategories(data.categories);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategoriesApi;
