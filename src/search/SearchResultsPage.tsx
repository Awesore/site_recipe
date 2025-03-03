import { Link, useLocation } from "react-router-dom";
import RecipeSearchDone from "./RecipeSearchDone";
import "../recipe/RecipeStyles.css";

const SearchResultsPage = () => {
  const location = useLocation();
  const { recipeList = [], query = "" } = location.state || {};
  const meals = recipeList.meals || [];
  console.log(meals);
  return (
    <div>
      <Link to="/" className="back-button">
        ← Back to all recipes
      </Link>
      <h1>Search Results for "{query || "No query provided"}"</h1>
      {meals.length > 0 ? (
        <RecipeSearchDone recipeList={meals} />
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
