import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useRecipeSearch} from "../../api";
import { IoIosSearch } from "react-icons/io";

export default function SearchRecipe() {
  const [searchRecipe, setSearchRecipe] = useState("");
  const { isLoading, error, fetchRecipe } = useRecipeSearch();
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRecipe(e.target.value);
  };

  const performSearch = async () => {
    if (searchRecipe && !isLoading) {
      const recipes = await fetchRecipe(searchRecipe);
      navigate("/search", {
        state: { recipeList: recipes, query: searchRecipe },
      });
      setSearchRecipe("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const handleIconDown = () => {
    performSearch();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search Recipe"
          value={searchRecipe}
          onChange={changeHandler}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <IoIosSearch onClick={handleIconDown} />
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

