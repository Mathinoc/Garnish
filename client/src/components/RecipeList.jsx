import React from 'react';
import { getRandomRecipes } from '../data';
import RecipeView from './RecipeView';
import './../styling/RecipeList.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getRandomRecipess, getSearchResults } from './../services/recipeService';
import { scrollToTop } from '../utils/scrollToTop';


export default function RecipeList({ randomListInitial, setRandomList, toggleHeart }) {

  const [limit, setLimit] = useState(10)

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
  // const randomList = randomListInitial;

  const [partialList, setPartialList] = useState(randomListInitial)
  // const partialListCopy = partialList;
  
  useEffect(() => {
    console.log('useeffect in recipeLIst', limit)

    setPartialList(randomListInitial.slice(0, limit)) ;

  }, [randomListInitial, limit])

  function getMoreRecipes() {
    console.log('increasing limit')
    setLimit(limit + 10);
  }
  
  
  
  const [favoriteList, setfavoriteList] = useState([]);
  





  return (
    <div className="list-container" >
      <p className="suggestion" >Suggested Recipes</p>
      <div className="recipe-list-frame">
        {partialList.map(el => {
          return (
            <div className="recipe-frame" key={el.id} >
              <button className="heart-btn" onClick={() => (toggleHeart(el.id))} >
                {el.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
              </button>
              <Link to={`/${el.id}`} onClick={scrollToTop}>
                <RecipeView toggleHeart={toggleHeart} recipe={el} key={el.id} />
              </Link>
            </div>
          )
        })}
      </div>
      <button className="btn-more" onClick={getMoreRecipes} disabled={limit>=20}>More...</button>
    </div>
  )
}