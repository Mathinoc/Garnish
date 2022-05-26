import React from 'react';
import RecipeView from './RecipeView';
import './../styling/RecipeList.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { scrollToTop } from '../utils/scrollToTop';
import animationServer from './../gifs/server.gif';

export default function RecipeList({ randomListInitial, toggleHeart }) {

  const [limit, setLimit] = useState(15)
  // const [partialList, setPartialList] = useState(randomListInitial)

  // useEffect(() => {
  //   if (randomListInitial.ok) {
  //     setPartialList({
  //       ok: true,
  //       resultArray: randomListInitial.resultArray.slice(0, limit)
  //     });
  //   }
  //   // else { setPartialList(randomListInitial) }
  // }, [randomListInitial, limit])

  function getMoreRecipes() {
    setLimit(limit + 15);
  }

  return (
    <div className="list-container" >
      <p className="suggestion" >Suggested Recipes</p>
      <div className="recipe-list-frame">
        {(
          randomListInitial.ok &&
          (randomListInitial.resultArray.slice(0, limit).map(el => (
            <div className="recipe-frame" key={el.id} >
              <button className="heart-btn" onClick={() => (toggleHeart(el.id))} >
                {el.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
              </button>
              <Link to={`/${el.id}`} onClick={scrollToTop}>
                <RecipeView recipe={el} key={el.id} />
              </Link>
            </div>
          )))
        ) || (
            !randomListInitial.ok &&
            (
              <div>
                <div style={{ 'fontSize': '20px' }} >{randomListInitial.displayText}</div>
                <img alt="server animation" src={animationServer} style={{ width: '20vw' }} />
              </div>
            )
          )}
      </div>
      <button className="btn-more" onClick={getMoreRecipes} disabled={limit >= 20}>More...</button>
    </div>
  )
}