import { useMutation } from "@tanstack/react-query";

const searchRecipe = async (query: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export default function useSearchApi() {
  const mutation = useMutation({
    mutationFn: searchRecipe,
  });

  return {
    isLoading: mutation.isPending,
    error: mutation.error ? mutation.error.message : null,
    fetchRecipe: mutation.mutateAsync,
  };
}
