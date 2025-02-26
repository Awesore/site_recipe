import { Routes, Route } from "react-router-dom";
import App from "./App";
import Recipe from "./Recipe";
import SearchResultsPage from "./search/SearchResultsPage";
import FavoritesPage from "./FavoritePage";
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
};
export default RoutesComponent;
