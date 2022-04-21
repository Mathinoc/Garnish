import React from 'react';
import { useState, useEffect } from 'react';
import { getSearchResults } from './../services/recipeService';
import { Link } from "react-router-dom";
import RecipeView from './RecipeView';

export default function SearchList({ number, searchSet }) {
  const [searchList, setSearchList] = useState([]);

  const searchDetails = {
    search : searchSet.searchRecipe,
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
        if (Array.isArray(result)) {
          return setSearchList(result);
        } else {
          alert("Couldn't get any result for your search :/")
        }
      })
      .catch(error => console.log("getSearchResults()", error))

  }, [])

  return (
    <div className="recipe-list-frame">
      {searchList.map(el => {
        return (
          <Link to={`/${el.id}`} key={el.id} onClick={goToTop}><RecipeView recipe={el} key={el.id} /></Link>
        )
      })}
    </div>
    // <>
    //   <div>Search value: {searchSet.searchRecipe}</div>
    //   <div>Search value: {searchSet.vegetarian ? 'true' : 'false'}</div>
    //   <div>Search value: {searchSet.glutenFree ? 'true' : 'false'}</div>
    //   <div>Search value: {searchSet.dairyFree ? 'true' : 'false'}</div>
    // </>
  )
}

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};