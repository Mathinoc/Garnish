import React from 'react';
import Ingredient from './Ingredient';
import './../styling/IngredientList.css';

export default function IngredientList({ ingredients }) {
  return (
    <div className='ingredient-list-container'>
      <ul className="ingredient-unorder-list" >
        {ingredients.map(ingredient => {
          // return (
          //   <Ingredient ingredientDetail={ingredient} key={ingredient.id} />
          // )

          // <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredientDetail.image}`} alt={ingredientDetail.image.slice(-4)} />
          {/* <p>{ingredientDetail.amount} {ingredientDetail.unit}</p> */ }
          return (<li><span>{ingredient.original}</span></li>)
        })}
      </ul>
    </div>
  )
}
