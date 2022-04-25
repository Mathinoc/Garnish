import React from 'react';
import { scrollToTop } from '../../utils/scrollToTop';
import { Link } from "react-router-dom";
import { getRecipeInMyList } from './../../services/recipeService';
import { useState, useEffect } from 'react';
import RecipeView from './../RecipeView.jsx';

export default function SavedRecipes({ myList, toggleHeart }) {

  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    getRecipeInMyList(myList)
      .then(result => {
        console.log('in segetRecipeInMyListarchlist', result)

        if (Array.isArray(result)) {
          result.map(el => el["favorite"] = true)
          setSavedRecipes(result)
        }
      })
      .catch(error => {
        console.log("getSearchResults()", error)
      })

  }, [])


  return (
    <div className="list-container" >
      <p className="suggestion" >Favorites</p>
      <div className="recipe-list-frame">
        {savedRecipes.map(el => {
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
    </div>
  )
}
