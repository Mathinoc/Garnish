import React from 'react';
import { getRandomRecipes } from '../data';
import RecipeView from './RecipeView';
import './../styling/RecipeList.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getRandomRecipess, getSearchResults } from './../services/recipeService';
import { scrollToTop } from '../utils/scrollToTop';


export default function RecipeList({ number }) {

  let [randomList, setRandomList] = useState([]);

  //! from API
  // useEffect(() => {
  //   getRandomRecipess(number)
  //     .then(result => {
  //       if (Array.isArray(result)) {
  //         return setRandomList(result);
  //       } else {
  //         alert("Couldn't get the data :/")
  //       }
  //     })
  //     .catch(error => console.log("getRandomRecipess()", error))
  //   }, [])

  //! from saved data
  useEffect(() => {
    setRandomList(getRandomRecipes(10))
  }, [])

  return (
    <div className="recipe-list-frame">
      {randomList.map(el => {
        return (
          <Link to={`/${el.id}`} key={el.id} onClick={scrollToTop}><RecipeView recipe={el} key={el.id} /></Link>
        )
      })}
    </div>
  )
}