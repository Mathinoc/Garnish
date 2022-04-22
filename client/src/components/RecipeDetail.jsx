import React from 'react';
import { getRecipeByIdData } from './../data';
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import './../styling/RecipeDetail.css';
import IngredientList from './IngredientList';
import InstructionList from './InstructionList';
import RecipeList from './RecipeList';
import SimilarList from './SimilarList';
import { getRecipeById } from './../services/recipeService';
import BarChart from '../charts/BarChart';
import { scrollToTop } from '../utils/scrollToTop';


export default function RecipeDetail({ myList, toggleHeart }) {

  let params = useParams();

  let recipe = getRecipeByIdData(parseInt(params.recipeId, 10));
  let recipeId = params.recipeId;
  myList.includes(recipe.id) ? recipe["favorite"] = true : recipe["favorite"] = false;
  //! API
  // let { recipeId } = useParams();
  // console.log('recipe ID', recipeId);
  // let [ recipe, setRecipe ] = useState({});
  // useEffect(()=> {
  //   getRecipeById(recipeId, {})
  //   .then(result => {

  //     if (result['id'] === parseInt(recipeId, 10)) {
  //       return setRecipe(result)
  //     }
  //     alert('Could not get recipe details :/')
  //   })
  //   .catch(error => console.log("RecipeDetail()", error))
  // }, [recipeId])




  return (
    <>
      <div className="recipe-detail-container">
        <img src={recipe.image} className="cover-img" />
        <p>{recipe.title}</p>
        <button className="heart-btn-detail" onClick={() => (toggleHeart(recipe.id))} >
          {recipe["favorite"] ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
        </button>

        <div className="graph-container">
          <BarChart />
        </div>

        <h2>Ingredients</h2>
        <p>Servings {recipe.servings}</p>
        {recipe.extendedIngredients &&
          <IngredientList ingredients={recipe.extendedIngredients} />
        }
        <h2>Instructions</h2>
        {recipe.analyzedInstructions &&
          <InstructionList instructions={recipe.analyzedInstructions[0].steps} />
        }
      </div>
      <div>
        <h2>Similar recipes</h2>
        {/* <Link to={`/${recipeId}`} key={recipeId} onClick={scrollToTop}><SimilarList number={10} id={recipeId} /></Link> */}
      </div>
    </>
  )
}