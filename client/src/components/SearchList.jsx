import React from 'react';
import { useState, useEffect } from 'react';
import { getSearchResults } from './../services/recipeService';
import { Link } from "react-router-dom";
import RecipeView from './RecipeView';
import { scrollToTop } from '../utils/scrollToTop';
import animationSearch from './../gifs/searching-for-word.gif';
import './../styling/RecipeList.css';
import { getRecipeTemplate } from './../data';


export default function SearchList({ number, searchSet, toggleHeart, myList }) {
  const [searchList, setSearchList] = useState({});
  const [limit, setLimit] = useState(12);

  const searchDetails = {
    search: searchSet.searchRecipe,
    vegetarian: searchSet.vegetarian,
    gluten: searchSet.gluten,
    dairy: searchSet.dairy,
    number: number || 20
  }

  useEffect(() => {
    getSearchResults(searchDetails)
      .then(result => {
        if (result.totalResults && result.totalResults > 0) { // Array.isArray(result)
          result["results"].map(el => {
            myList.includes(el.id) ? el["favorite"] = true : el["favorite"] = false;
          })
          setSearchList({ ok: true, resultArray: result["results"] });
        } else if (result.totalResults === 0) {
          const message = `Sorry, we couldn't find anything for ' ${searchDetails.search} '`
          setSearchList({ ok: false, displayText: message })
        }
      })
      .catch(error => {
        console.log("getSearchResults()", error)
        setSearchList({ ok: false, displayText: 'Error from server' })
      })
    //!data from data.json
    //setSearchList({ok:true,resultArray:[getRecipeTemplate()]})
  }, [searchSet])

  useEffect(() => {
    if (searchList.resultArray && searchList.resultArray.length) {
      const newSearchList = searchList.resultArray.map(el => {
        myList.includes(el.id) ? el["favorite"] = true : el["favorite"] = false
        return el
      });
      console.log('searchlist', newSearchList)
      setSearchList({ ...searchList, resultArray: newSearchList })
    }
  }, [myList])


  return (
    <div className="list-container" >
      <p className="suggestion" >Results for {searchSet.searchRecipe}</p>
      <div className="recipe-list-frame">
        {(searchList.ok &&
          (searchList.resultArray.map((el, index) => {
            if (index < limit) {
              return (
                <div className="recipe-frame" key={el.id}>
                  <button className="heart-btn" onClick={() => (toggleHeart(el.id))} >
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
          || (searchList.ok === false &&
            (<div>
              <div style={{ 'font-size': '20px' }}>
                {searchList.displayText}
              </div>
              <img src={animationSearch} style={{ width: '20vw' }} />
            </div>
            ))
        }
      </div>
      <button
        className="btn-more"
        onClick={() => setLimit(limit + 10)}
        disabled={limit >= (searchList.resultArray && searchList.resultArray.length)}
      >
        More...
      </button>
    </div>
  )
}
