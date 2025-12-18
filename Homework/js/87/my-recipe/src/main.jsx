import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RecipeApp from "./RecipeApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    < RecipeApp />
  </StrictMode>
);
