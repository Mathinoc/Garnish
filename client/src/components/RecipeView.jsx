import React from 'react';
import './../styling/RecipeView.css';

export default function RecipeView({ recipe, toggleHeart }) {
  const id = recipe.id;
  const size = "556x370"
  const imgHref = `https://spoonacular.com/recipeImages/${id}-${size}.jpg`;

  

  return (
    <div className="single-recipe-container">
      <img src={imgHref} alt={`image of ${recipe.title}`} />
      <p>{recipe.title}</p>
      
    </div>
  )
}
