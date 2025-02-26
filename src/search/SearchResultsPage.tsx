
import { Link, useLocation } from "react-router-dom";
import RecipeSearchDone from "./RecipeSearchDone";
import "../RecipeStyles.css";

const SearchResultsPage = () => {
  const location = useLocation();
  const { recipeList = [], query = "" } = location.state || {};

  return (
    <div>
      <Link to="/" className="back-button">
        ← Back to all recipes
      </Link>
      <h1>Search Results for "{query || "No query provided"}"</h1>
      {recipeList.length > 0 ? (
        <RecipeSearchDone recipeList={recipeList} />
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
