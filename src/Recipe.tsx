import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./RecipeDetail.css";

interface RecipeDetail {
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

interface ApiResponse {
  meals: RecipeDetail[] | null;
}

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data: ApiResponse = await response.json();

        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError("Failed to fetch recipe details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipeDetail();
    }
  }, [id]);

  const getIngredients = () => {
    if (!recipe) return [];

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetail];
      const measure = recipe[`strMeasure${i}` as keyof RecipeDetail];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          ingredient,
          measure: measure || "",
        });
      }
    }
    return ingredients;
  };

  const getYoutubeEmbedUrl = () => {
    if (!recipe?.strYoutube) return null;

    const videoId = recipe.strYoutube.split("v=")[1];
    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (loading) {
    return <div className="loading-container">Loading recipe details...</div>;
  }

  if (error || !recipe) {
    return (
      <div className="error-container">
        <p>{error || "Failed to load recipe"}</p>
        <Link to="/" className="back-link">
          Return to all recipes
        </Link>
      </div>
    );
  }

  const ingredients = getIngredients();
  const youtubeUrl = getYoutubeEmbedUrl();

  return (
    <div className="recipe-detail-container">
      <Link to="/" className="back-button">
        ← Back to all recipes
      </Link>

      <div className="recipe-header">
        <h1>{recipe.strMeal}</h1>
        <div className="recipe-meta-info">
          <span className="category">Category: {recipe.strCategory}</span>
          <span className="area">Cuisine: {recipe.strArea}</span>
          {recipe.strTags && (
            <span className="tags">Tags: {recipe.strTags}</span>
          )}
        </div>
      </div>

      <div className="recipe-content">
        <div className="recipe-image-container">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="recipe-detail-image"
          />
        </div>

        <div className="recipe-ingredients">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((item, index) => (
              <li key={index}>
                <span className="ingredient-measure">{item.measure}</span>
                <span className="ingredient-name">{item.ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-instructions">
          <h2>Instructions</h2>

          {recipe.strInstructions
            .split("\r\n")
            .filter(Boolean)
            .map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
        </div>

        {youtubeUrl && (
          <div className="recipe-video">
            <h2>Video Tutorial</h2>
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src={youtubeUrl}
                title={`Video tutorial for ${recipe.strMeal}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {recipe.strSource && (
          <div className="recipe-source">
            <h2>Source</h2>
            <a
              href={recipe.strSource}
              target="_blank"
              rel="noopener noreferrer"
            >
              Original Recipe
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
