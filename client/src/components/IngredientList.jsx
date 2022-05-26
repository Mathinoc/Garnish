import React from 'react';
import './../styling/IngredientList.css';

export default function IngredientList({ ingredients }) {
  return (
    <div className='ingredient-list-container'>
      <ul className="ingredient-unorder-list" >
        {ingredients.map(ingredient => {
          return (
            <li key = {ingredient.id}>
              <span>{ingredient.original}</span>
            </li>
            )
        })}
      </ul>
    </div>
  )
}
