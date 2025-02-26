import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "./favoritesSlice.ts";
import { RootState } from "./redux/store.ts";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import "./RecipeStyles.css";

interface RecipeTitleProps {
  id: string;
  name: string;
  category: string;
  area: string;
  image: string;
}

const RecipeTitle: React.FC<RecipeTitleProps> = ({
  id,
  name,
  category,
  area,
  image,
}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const isFavorite = favorites.some((fav) => fav.idMeal === id);

  const toggleFavorite = () => {
    const recipe = {
      idMeal: id,
      strMeal: name,
      strCategory: category,
      strArea: area,
      strMealThumb: image,
    };
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(recipe));
    }
  };

  return (
    <div className="recipe-card">
      <Link to={`/recipe/${id}`} className="recipe-link">
        <div className="recipe-image">
          <img src={image} alt={name} />
        </div>
        <div className="recipe-details">
          <h3 className="recipe-title">{name}</h3>
          <div className="recipe-meta">
            <div className="category-wrapper">
              <span className="category">
                <strong>Category:</strong> {category}
              </span>
              <button
                className="favorite-btn"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite();
                }}
              >
                {isFavorite ? (
                  <IoIosHeart color="red" size={20} />
                ) : (
                  <IoIosHeartEmpty color="gray" size={20} />
                )}
              </button>
            </div>
            <span className="origin">
              <strong>Origin:</strong> {area}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeTitle;
