import React from 'react';
import { getRandomRecipes } from '../data';
import RecipeView from './RecipeView';
import './../styling/RecipeList.css';
import { Link } from "react-router-dom";


export default function RecipeList({number}) {
  let randomRecipes = getRandomRecipes(number);
  return (
    <div className="recipe-list-container">
      {randomRecipes.map(el => {
        return (
          <Link to={`/${el.id}`} key={el.id}><RecipeView recipe={el} key={el.id} /></Link>
        )
      })}
    </div>
  )
}
