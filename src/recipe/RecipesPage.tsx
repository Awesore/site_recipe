import React, { useState } from "react";
import {
  useRecipeApi,
  useCategoriesApi,
  useRecipesByCategory,
} from "../../api";
import RecipeTitle from "./RecipeTitle";
import SearchPage from "../search/SearchPage";
import { Link } from "react-router-dom";

const RecipesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Get all recipes (only used when no category is selected)
  const {
    recipes,
    loading: recipesLoading,
    error: recipesError,
    fetchMoreRecipes,
    hasMore,
  } = useRecipeApi();

  // Get available categories for the dropdown
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategoriesApi();

  // Get filtered recipes by category (removed allRecipes parameter)
  const {
    filteredRecipes,
    loading: filterLoading,
    error: filterError,
    isFiltered,
  } = useRecipesByCategory(selectedCategory);

  const handleScroll = (): void => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 20 &&
      !recipesLoading &&
      !filterLoading &&
      hasMore &&
      !selectedCategory // Infinite scroll only without a filter
    ) {
      fetchMoreRecipes();
    }
  };

  // Add scroll event listener
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [recipesLoading, filterLoading, hasMore, selectedCategory]);

  // Handle all potential errors
  const error = recipesError || categoriesError || filterError;
  if (error) return <div className="error-message">{error}</div>;

  // Determine if we're in a loading state
  const isLoading = recipesLoading || categoriesLoading || filterLoading;

  // Choose which recipes to display
  const displayRecipes = isFiltered ? filteredRecipes : recipes;
  console.log(recipes);
  return (
    <div className="recipes-container">
      <div className="header-section">
        <SearchPage />
      </div>
      <div className="title-section">
        <Link to="/favorites" className="favorite-link">
          <h1>Favorite</h1>
        </Link>
        <h1 className="all-recipes-title">All Recipes</h1>
      </div>
      <div className="filter-section">
        <label htmlFor="category-select">Filter by Category: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={isLoading}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.idCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
      </div>
      <div className="recipe-grid">
        {displayRecipes.length > 0 ? (
          displayRecipes.map((recipe) => (
            <RecipeTitle
              key={recipe.idMeal}
              id={recipe.idMeal}
              name={recipe.strMeal}
              category={recipe.strCategory || selectedCategory}
              area={recipe.strArea || "Unknown"}
              image={recipe.strMealThumb}
            />
          ))
        ) : (
          <p>
            No recipes found
            {selectedCategory ? ` for "${selectedCategory}"` : ""}.
          </p>
        )}
      </div>
      {isLoading && <div className="loading">Loading more recipes...</div>}
      {!hasMore && recipes.length > 0 && !selectedCategory && (
        <div className="end-message">No more recipes to load</div>
      )}
    </div>
  );
};

export default RecipesPage;
