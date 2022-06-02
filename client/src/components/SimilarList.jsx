import React from 'react';
import './../styling/RecipeList.scss';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import RecipeView from './RecipeView';
import { getSimilarRecipes } from './../services/recipeService';
import { scrollToTop } from '../utils/scrollToTop';
import animationSearch from './../gifs/searching-for-word.gif';


export default function SimilarList({ id, number, toggleHeart, myList }) {
  const [similarList, setSimilarList] = useState([]);

  useEffect(() => {
    getSimilarRecipes(id, number)
      .then(result => {
        if (Array.isArray(result) && result.length > 0) {
          result.map(el => {
            myList.includes(el.id) ? el["favorite"] = true : el["favorite"] = false;
          })
          setSimilarList({ ok: true, resultArray: result });
        } else if (Array.isArray(result) && result.length === 0) {
          const message = "There is no similar recipe in our database! :)"
          setSimilarList({ ok: false, displayText: message });
        } else {
          const message = "Sorry, we couldn't get any similar recipe from the database"
          setSimilarList({ ok: false, displayText: message });
        }
      })
      .catch(error => console.log("getRandomRecipess()", error))
  }, [id])

  function handleClick(recipeId) {
    toggleHeart(recipeId);
    similarList.resultArray.map(el => {
      if (el.id === recipeId) {
        el.favorite = !el.favorite;
      }
    })
  }

  return (
    <div className="recipe-list-frame frame-rounded-bottom">
      {(
        similarList.ok &&
          similarList.resultArray.map(el => {
            return (
              <div className="recipe-frame" key={el.id} >
                <button className="heart-btn" onClick={() => (handleClick(el.id))} >
                  {el.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                </button>
                <Link to={`/${el.id}`} key={el.id} onClick={scrollToTop}>
                  <RecipeView recipe={el} key={el.id} />
                </Link>
              </div>
            )
          })
        )
        ||
        (
          <div>
            <div style={{ 'fontSize': '20px' }}>{similarList.displayText}</div>
            <img src={animationSearch} style={{ width: '20vw' }} />
          </div>
        )
      }
    </div>
  )
}
