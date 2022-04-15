import React from 'react';
import './../styling/RecipeView.css';

export default function RecipeView({ recipe }) {
  return (
    <div className="single-recipe-container">
      <img src={recipe.image} />
      <p>{recipe.title}</p>
    </div>
  )
}
