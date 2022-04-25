import React from 'react';
import { scrollToTop } from '../../utils/scrollToTop';
import { Link } from "react-router-dom";
import { getRecipeInMyList } from './../../services/recipeService';
import { useState, useEffect } from 'react';
import RecipeView from './../RecipeView.jsx';
import empty from './../../gifs/empty.gif';

export default function SavedRecipes({ myList, toggleHeart }) {

  const [savedRecipes, setSavedRecipes] = useState([]);
  console.log('myList', myList)
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

  function handleClick(recipeId) {
    toggleHeart(recipeId);
    const filterRecipes = savedRecipes.filter(el => el.id !== recipeId);
    setSavedRecipes(filterRecipes);
  }

  return (
    <div className="list-container" >
      <p className="suggestion" >Favorites</p>
      <div className="recipe-list-frame">
        {savedRecipes.length > 0 ?
          (
            savedRecipes.map(el => {
              return (
                <div className="recipe-frame" key={el.id} >
                  <button className="heart-btn" onClick={() => (handleClick(el.id))} >
                    {el.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                  </button>
                  <Link to={`/${el.id}`} onClick={scrollToTop}>
                    <RecipeView toggleHeart={toggleHeart} recipe={el} key={el.id} />
                  </Link>
                </div>
              )
            })
          )
          :
          <>
            <div style={{ 'font-size': '20px' }}>You don't have any saved recipe yet!</div>
            <img src={empty} style={{ width: '400px' }} />
          </>
        }
      </div>
    </div>
  )
}
