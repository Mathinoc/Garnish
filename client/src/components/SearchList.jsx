import React from 'react';
import { useState, useEffect } from 'react';
import { getSearchResults } from './../services/recipeService';
import { Link } from "react-router-dom";
import RecipeView from './RecipeView';
import { scrollToTop } from '../utils/scrollToTop';
import animationSearch from './../gifs/searching-for-word.gif';
import animationServer from './../gifs/server.gif';
import './../styling/RecipeList.css';
import { getRecipeTemplate } from './../data';


export default function SearchList({ number, searchSet, toggleHeart, myList }) {
  const [searchList, setSearchList] = useState({});
  const [myListBis, setMyListBis] = useState(myList)
  const [limit, setLimit] = useState(10)

  const searchDetails = {
    search: searchSet.searchRecipe,
    vegetarian: searchSet.vegetarian,
    gluten: searchSet.gluten,
    dairy: searchSet.dairy,
    number: number
  }

  useEffect(() => {
    console.log('in useeffect')
    getSearchResults(searchDetails)
      .then(result => {
        if (result.totalResults && result.totalResults > 0) { // Array.isArray(result)
          result["results"].map(el => {
            myListBis.includes(el.id) ? el["favorite"] = true : el["favorite"] = false;
          })
          setSearchList({ resultBoolean: 'ok', resultArray: result["results"] });
        } else if (result.totalResults === 0) {
          const message = `Sorry, we couldn't find anything for ' ${searchDetails.search} '`
          setSearchList({ resultBoolean: 'notOk', displayText: message })
        }
      })
      .catch(error => {
        console.log("getSearchResults()", error)
        setSearchList({ resultBoolean: 'serverIssue', displayText: 'Error from server' })
      })
    //!data from data.json
    //setSearchList({resultBoolean:'ok',resultArray:[getRecipeTemplate()]})
  }, [searchSet])

  useEffect(() => {
    localStorage.setItem("myFavorites", JSON.stringify(myListBis))
  }, [myListBis])

  function heartClick(recipeId) {
    const newSearchList = searchList.resultArray.map(el => {
      if (el.id === recipeId) {
        el.favorite = !el.favorite;
        if (el.favorite) {
          setMyListBis([...myListBis, recipeId]);
        } else {
          setMyListBis(myListBis.filter(id => id !== recipeId));
        }
      }
      return el
    });
    const statusValue = 'ok';
    setSearchList({ resultArray: newSearchList, resultBoolean: statusValue })
    toggleHeart(recipeId)
  }




  function getMoreRecipes() {
    setLimit(limit + 10);
  }

  return (
    <div className="list-container" >
      <p className="suggestion" >Results for {searchSet.searchRecipe}</p>
      <div className="recipe-list-frame">
        {(searchList.resultBoolean === 'ok' &&
          (searchList.resultArray.map((el, index) => {
            if (index < limit) {
              return (
                <div className="recipe-frame" key={el.id}>
                  <button className="heart-btn" onClick={() => (heartClick(el.id))} >
                    {el["favorite"] ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                  </button>
                  <Link to={`/${el.id}`} key={el.id} onClick={scrollToTop}>
                    <RecipeView toggleHeart={toggleHeart} recipe={el} key={el.id} />
                  </Link>
                </div>
              )
            }
          })
          ))
          || (searchList.resultBoolean === 'notOk' &&
            (<div>
              <div style={{ 'font-size': '20px' }}>{searchList.displayText}</div>
              <img src={animationSearch} style={{ width: '20vw' }} />
            </div>))
          || (searchList.resultBoolean === 'serverIssue' &&
            (
              <div>
                <div style={{ 'font-size': '20px' }} >{searchList.displayText}</div>
                <img src={animationServer} style={{ width: '20vw' }} />
              </div>
            ))
        }

      </div>
      <button className="btn-more" onClick={getMoreRecipes} disabled={limit >= 20}>More...</button>
    </div>
  )
}
