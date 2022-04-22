import React from 'react';
import { getRandomRecipes } from '../data';
import RecipeView from './RecipeView';
import './../styling/RecipeList.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getRandomRecipess, getSearchResults } from './../services/recipeService';
import { scrollToTop } from '../utils/scrollToTop';


export default function RecipeList({ randomList }) {

  const [limit, setLimit] = useState(25)

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

  const [partialList, setPartialList] = useState([])

  useEffect(() => {
    setPartialList(randomList.slice(0, limit))
  }, [partialList])

  function getMoreRecipes () {
    setLimit(limit+25);
  }


  return (
    <div className="list-container" >
    <p className="suggestion" >Suggested recipes</p>
    <div className="recipe-list-frame">
      {partialList.map(el => {
        return (
          <Link to={`/${el.id}`} key={el.id} onClick={scrollToTop}><RecipeView recipe={el} key={el.id} /></Link>
          )
        })}
    </div>
    <button className="btn-more" onClick={getMoreRecipes}>More recipes</button>
    </div>
  )
}