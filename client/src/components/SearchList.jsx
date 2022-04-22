import React from 'react';
import { useState, useEffect } from 'react';
import { getSearchResults } from './../services/recipeService';
import { Link } from "react-router-dom";
import RecipeView from './RecipeView';
import { scrollToTop } from '../utils/scrollToTop';
import animationSearch from './../gifs/searching-for-word.gif';

export default function SearchList({ number, searchSet }) {
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
          setSearchList({ resultBoolean: true, resultArray: result["results"] });

        } else if (result.totalResults === 0 ) {

          // alert("Couldn't get any result for your search :/");
          setSearchList({ resultBoolean: false, displayText: `Sorry we couldn't find anything for ${searchDetails.search}` })
        }
      })
      .catch(error => console.log("getSearchResults()", error))

  }, [searchSet])

  return (
    <div className="recipe-list-frame">
      {searchList.resultBoolean ?
        (searchList.resultArray.map(el => {
          return (
            <Link to={`/${el.id}`} key={el.id} onClick={scrollToTop}><RecipeView recipe={el} key={el.id} /></Link>
          )
        })
        )
        :
        <>
          <div>{searchList.displayText}</div>
          <img src={animationSearch} style={{width: '40vw'}}/>
        </>
      }

    </div>
  )
}
