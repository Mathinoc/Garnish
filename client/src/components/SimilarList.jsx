import React from 'react';
import './../styling/RecipeList.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import RecipeView from './RecipeView';
import { getSimilarRecipes } from './../services/recipeService';

export default function SimilarList({ number, id }) {
  let [similarList, setSimilarList] = useState([]);

  useEffect(() => {
      getSimilarRecipes(id, number)
        .then(result => {
          if (Array.isArray(result)) {
            return setSimilarList(result);
          } else {
            alert("Couldn't get similar recipes :/")
          }
        })
        .catch(error => console.log("getRandomRecipess()", error))
      }, [])

  return (
    <div className="recipe-list-frame">
        {similarList.map(el => {
          return (
            <Link to={`/${el.id}`} key={el.id} onClick={goToTop}><RecipeView recipe={el} key={el.id} /></Link>
          )
        })}
      </div>
  )
}

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};