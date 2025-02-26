import React, { useEffect, useState } from "react";
import useRecipeApi from "../api/index.ts";
import RecipeTitle from "./RecipeTitle.tsx";
import SearchPage from "./search/SearchPage.tsx";
import { Link } from "react-router-dom";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strInstructions?: string;
  strTags?: string;
}

interface Category {
  idCategory: string;
  strCategory: string;
}

const RecipesPage: React.FC = () => {
  const { recipes, loading, error, fetchMoreRecipes, hasMore } = useRecipeApi();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Meal[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Завантаження категорій
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php",
        );
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Помилка завантаження категорій:", err);
      }
    };
    fetchCategories();
  }, []);

  // Початкова загрузка рецептів
  useEffect(() => {
    if (isInitialLoad && !loading && recipes.length === 0) {
      fetchMoreRecipes();
      setIsInitialLoad(false);
    }
  }, [fetchMoreRecipes, recipes.length, loading, isInitialLoad]);

  // Оновлення відфільтрованих рецептів
  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      if (!selectedCategory) {
        setFilteredRecipes(recipes); // Показуємо всі рецепти, коли немає фільтра
        return;
      }

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCategory)}`,
        );
        const data = await response.json();
        const mealIds = (data.meals || []).map((meal: any) => meal.idMeal);

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
      } catch (err) {
        console.error("Помилка завантаження страв за категорією:", err);
        setFilteredRecipes([]);
      }
    };

    fetchRecipesByCategory();
  }, [selectedCategory, recipes]);

  const handleScroll = (): void => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading &&
      hasMore &&
      !selectedCategory // Бесконечна прокрутка тільки без фільтра
    ) {
      fetchMoreRecipes();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, selectedCategory]);

  if (error) return <div className="error-message">{error}</div>;

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
          disabled={loading}
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
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
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
      {loading && <div className="loading">Loading more recipes...</div>}
      {!hasMore && recipes.length > 0 && !selectedCategory && (
        <div className="end-message">No more recipes to load</div>
      )}
    </div>
  );
};

export default RecipesPage;
