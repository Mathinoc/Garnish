import React from 'react';
import RecipeView from './RecipeView';
import './../styling/RecipeList.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { scrollToTop } from '../utils/scrollToTop';
import animationServer from './../gifs/server.gif';

export default function RecipeList({ randomListInitial, toggleHeart }) {

  const [limit, setLimit] = useState(10)
  const [partialList, setPartialList] = useState(randomListInitial)

  useEffect(() => {
    if (randomListInitial.resultBoolean === 'ok') {
      setPartialList({
        resultBoolean: 'ok',
        resultArray: randomListInitial.resultArray.slice(0, limit)
      });
    } 
    // else { setPartialList(randomListInitial) }
  }, [randomListInitial, limit])

  function getMoreRecipes() {
    setLimit(limit + 10);
  }

  return (
    <div className="list-container" >
      <p className="suggestion" >Suggested Recipes</p>
      <div className="recipe-list-frame">
        {(
          partialList.resultBoolean === 'ok'
          &&
          (
            partialList.resultArray.map(el => {
              return (
                <div className="recipe-frame" key={el.id} >
                  <button className="heart-btn" onClick={() => (toggleHeart(el.id))} >
                    {el.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                  </button>
                  <Link to={`/${el.id}`} onClick={scrollToTop}>
                    <RecipeView recipe={el} key={el.id} />
                  </Link>
                </div>
              )
            })
          )
        )
          ||
          (
            partialList.resultBoolean === 'serverIssue'
            &&
            (
              <div>
                <div style={{ 'fontSize': '20px' }} >{partialList.displayText}</div>
                <img alt="server animation" src={animationServer} style={{ width: '20vw' }} />
              </div>
            )
          )}
      </div>
      <button className="btn-more" onClick={getMoreRecipes} disabled={limit >= 20}>More...</button>
    </div>
  )
}