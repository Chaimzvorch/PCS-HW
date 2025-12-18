import { useState } from "react";

function AddRecipe({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients
    };

    onAddRecipe(newRecipe);

    // clear form
    setTitle("");
    setIngredients("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Recipe</h2>

      <div>
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Ingredients:</label>
        <input
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
      </div>

      <button type="submit">Save Recipe</button>
    </form>
  );
}

export default AddRecipe;
