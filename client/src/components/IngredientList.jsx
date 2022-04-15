import React from 'react';
import Ingredient from './Ingredient';
import './../styling/IngredientList.css';

export default function IngredientList({ingredients}) {
  return (
    <div className='ingredient-list-container'>
      {ingredients.map(ingredient => {
        return (
          <Ingredient ingredientDetail={ingredient} key={ingredient.id}/>
        )
      })}
    </div>
  )
}
