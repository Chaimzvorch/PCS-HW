import { useState } from "react";
import AddRecipe from "./AddRecipe";

function RecipeApp() {
  const [recipes, setRecipes] = useState([
    { id: 1, title: "Pasta", ingredients: "Noodles, Sauce" },
    { id: 2, title: "Toast", ingredients: "Bread, Butter" }
  ]);

  const [showAddRecipe, setShowAddRecipe] = useState(false);

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <div>
      <h1>Recipes</h1>

      <button onClick={() => setShowAddRecipe(!showAddRecipe)}>
        {showAddRecipe ? "Hide Add Recipe" : "Add Recipe"}
      </button>

      {showAddRecipe && <AddRecipe onAddRecipe={addRecipe} />}

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <strong>{recipe.title}</strong> – {recipe.ingredients}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeApp;
