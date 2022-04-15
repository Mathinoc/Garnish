import React from 'react';
import './../styling/Ingredient.css';

export default function Ingredient({ingredientDetail}) {
  return (
    <div className='ingredient-detail-container'>
      <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredientDetail.image}`} alt={ingredientDetail.image.slice(-4)}/>
      <p>{ingredientDetail.amount} {ingredientDetail.unit}</p>
      <p>{ingredientDetail.name}</p>
    </div>
  )
}
