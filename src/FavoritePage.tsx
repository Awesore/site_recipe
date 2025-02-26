
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "./favoritesSlice";
import { RootState } from "./redux/store";
import "./RecipeStyles.css";
import { Link } from "react-router-dom";
const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  return (
    <div className="recipes-container">
      <Link to="/" className="back-button">
        ← Back to all recipes
      </Link>

      <h1>Favorite Recipes</h1>
      {favorites.length > 0 ? (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <div className="recipe-card" key={recipe.idMeal}>
              <div className="recipe-image">
                <Link to={`/recipe/${recipe.idMeal}`} className="recipe-link">
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                </Link>
              </div>
              <div className="recipe-details">
                <h3 className="recipe-title">{recipe.strMeal}</h3>
                <div className="recipe-meta">
                  <span className="category">
                    <strong>Category:</strong> {recipe.strCategory}
                  </span>
                  <span className="origin">
                    <strong>Origin:</strong> {recipe.strArea}
                  </span>
                </div>
                <button
                  onClick={() => dispatch(removeFromFavorites(recipe.idMeal))}
                  style={{ marginTop: "10px", color: "red" }}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite recipes yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
