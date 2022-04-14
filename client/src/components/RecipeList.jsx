import React from 'react';
import { getRandomRecipes } from '../data';
import RecipeView from './RecipeView';

export default function RecipeList() {
  let randomRecipes = getRandomRecipes(10);
  return (
    <div>
      {randomRecipes.map(el => {
        return (
          <RecipeView recipe={el} key={el.id} />
        )
      })}
    </div>
  )
}
