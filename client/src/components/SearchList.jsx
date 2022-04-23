import React from 'react';
import { useState, useEffect } from 'react';
import { getSearchResults } from './../services/recipeService';
import { Link } from "react-router-dom";
import RecipeView from './RecipeView';
import { scrollToTop } from '../utils/scrollToTop';
import animationSearch from './../gifs/searching-for-word.gif';
import './../styling/RecipeList.css';


export default function SearchList({ number, searchSet, toggleHeart, myList }) {
  const [searchList, setSearchList] = useState({});

  const searchDetails = {
    search: searchSet.searchRecipe,
    vegetarian: searchSet.vegetarian,
    gluten: searchSet.gluten,
    dairy: searchSet.dairy,
    number: number
  }
  console.log('searchDetails', searchDetails)

  useEffect(() => {
    console.log('in useeffect')
    getSearchResults(searchDetails)
      .then(result => {
        console.log('in searchlist', result)

        if (result.totalResults && result.totalResults > 0) { // Array.isArray(result)
          console.log('got 1 or more results');

          result["results"].map(el => {
            myList.includes(el.id) ? el["favorite"] = true : el["favorite"] = false;
          })

          setSearchList({ resultBoolean: true, resultArray: result["results"] });

        } else if (result.totalResults === 0) {
          // alert("Couldn't get any result for your search :/");
          setSearchList({ resultBoolean: false, displayText: `Sorry we couldn't find anything for ${searchDetails.search}` })
        }
      })
      .catch(error => console.log("getSearchResults()", error))

  }, [searchSet])

  function heartClick (recipeId) {
    //toggleHeart(recipeId);
    setSearchList(searchList.resultArray.map(el => {
      if (el.id === recipeId) {
        el.favorite = !el.favorite;
      }
      return el
    }))
  }

  return (
    <div className="list-container" >
      <div className="recipe-list-frame">
        {searchList.resultBoolean ?
          (searchList.resultArray.map(el => {
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
          })
          )
          :
          <>
            <div>{searchList.displayText}</div>
            <img src={animationSearch} style={{ width: '40vw' }} />
          </>
        }

      </div>
    </div>
  )
}
