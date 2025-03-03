import { Routes, Route } from "react-router-dom";
import RecipesPage from "../src/recipe/RecipesPage";
import Recipe from "../src/recipe/Recipe";
import SearchResultsPage from "./search/SearchResultsPage";
import FavoritesPage from "./favorite/FavoritePage";
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<RecipesPage />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
};
export default RoutesComponent;
