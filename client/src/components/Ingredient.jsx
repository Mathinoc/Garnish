import React from 'react';
import './../styling/Ingredient.css';

export default function Ingredient({ingredientDetail}) {
  const quantity = (ingredientDetail.amount * 100).toString();
  const sliceNum = quantity.slice(0, quantity.indexOf('.'));
  const roundedNumber = parseInt(sliceNum, 10)/10;

  return (
    <div className='ingredient-detail-container'>
      <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredientDetail.image}`} alt={ingredientDetail.image.slice(-4)}/>
      {/* <p>{ingredientDetail.amount} {ingredientDetail.unit}</p> */}
      <p>{ingredientDetail.original}</p>
    </div>
  )
}
