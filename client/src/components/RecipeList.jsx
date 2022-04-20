import React from 'react';
import { getRandomRecipes } from '../data';
import RecipeView from './RecipeView';
import './../styling/RecipeList.css';
import { Link } from "react-router-dom";


export default function RecipeList({ number }) {
  let randomRecipes = getRandomRecipes(number);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    // <div className="recipe-list-container">
      <div className="recipe-list-frame">
        {randomRecipes.map(el => {
          return (
            <Link to={`/${el.id}`} key={el.id} onClick={goToTop}><RecipeView recipe={el} key={el.id} /></Link>
          )
        })}
      </div>
    // </div>
  )
}
