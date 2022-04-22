import React from 'react';
import { getRandomRecipes } from '../data';
import RecipeView from './RecipeView';
import './../styling/RecipeList.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getRandomRecipess, getSearchResults } from './../services/recipeService';
import { scrollToTop } from '../utils/scrollToTop';


export default function RecipeList({ number, randomList, refresh, setRefresh }) {

  // const [randomList, setRandomList] = useState([]);

  //! from API
  // function get () {
  //   getRandomRecipess(number)
  //     .then(result => {
  //       if (Array.isArray(result)) {
  //         return setRandomList(result);
  //       } else {
  //         alert("Couldn't get the data :/")
  //       }
  //     })
  //     .catch(error => console.log("getRandomRecipess()", error));
  //     setRefresh(false);
  //   }

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
  // useEffect(() => {
  //   setRandomList(getRandomRecipes(10))
  // }, [randomList])
  function getNewRecipes () {
    setRefresh(!refresh)
  }

  return (
    <div className="recipe-list-frame">
      <button onClick={getNewRecipes}>New recipes</button>
      {randomList.map(el => {
        return (
          <Link to={`/${el.id}`} key={el.id} onClick={scrollToTop}><RecipeView recipe={el} key={el.id} /></Link>
        )
      })}
    </div>
  )
}