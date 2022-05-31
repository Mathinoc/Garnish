import React from 'react';
import './../styling/RecipeView.scss';

export default function RecipeView({ recipe }) {
  const id = recipe.id;
  const size = "556x370"
  const imgHref = `https://spoonacular.com/recipeImages/${id}-${size}.jpg`;

  return (
    <div className="single-recipe-container">
      <img src={imgHref} alt={`${recipe.title}`} />
      <p>{recipe.title}</p>
    </div>
  )
}
