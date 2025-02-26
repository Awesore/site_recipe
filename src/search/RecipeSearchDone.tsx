// src/components/search/RecipeSearchDone.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../favoritesSlice";
import { RootState } from "../redux/store";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import "../RecipeStyles.css";

interface RecipeSearchDoneProps {
  recipeList: {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
  }[];
}

const RecipeSearchDone: React.FC<RecipeSearchDoneProps> = ({ recipeList }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  return (
    <div className="recipe-grid">
      {recipeList.map((recipe) => {
        const isFavorite = favorites.some(
          (fav) => fav.idMeal === recipe.idMeal,
        );

        const toggleFavorite = () => {
          if (isFavorite) {
            dispatch(removeFromFavorites(recipe.idMeal));
          } else {
            dispatch(addToFavorites(recipe));
          }
        };

        return (
          <div className="recipe-card" key={recipe.idMeal}>
            <Link to={`/recipe/${recipe.idMeal}`} className="recipe-link">
              <div className="recipe-image">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
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
              </div>
            </Link>
            <button
              className="favorite-btn"
              onClick={toggleFavorite}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
              }}
            >
              {isFavorite ? (
                <IoIosHeart color="red" size={24} />
              ) : (
                <IoIosHeartEmpty color="gray" size={24} />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeSearchDone;
