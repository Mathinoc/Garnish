import React from 'react';
import './../styling/RecipeList.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import RecipeView from './RecipeView';
import { getSimilarRecipes } from './../services/recipeService';
import { scrollToTop } from '../utils/scrollToTop';

export default function SimilarList({ id, number }) {
  const [similarList, setSimilarList] = useState([]);
  let gotData;
  useEffect(() => {
    console.log('In similar recipe id', id);
    getSimilarRecipes(id, number)
      .then(result => {
        if (Array.isArray(result)) {
          gotData = true;
          console.log('result inside similar list', result)
          setSimilarList(result);
        } else {
          console.log('Couldnt get similar recipes :/')
          gotData = false;
          //alert("Couldn't get similar recipes :/")
        }
      })
      .catch(error => console.log("getRandomRecipess()", error))
  }, [id])

  return (
    <div className="recipe-list-frame">
      {
        similarList.map(el => {
          return (
            <Link to={`/${el.id}`} key={el.id} onClick={scrollToTop}>
              <RecipeView recipe={el} key={el.id} />
            </Link>
          )
        })
      }
    </div>
  )
}
