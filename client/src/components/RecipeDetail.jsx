import React from 'react';
import {getRecipeById} from './../data';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import './../styling/RecipeDetail.css';
import IngredientList from './IngredientList';
import InstructionList from './InstructionList';
import RecipeList from './RecipeList';


export default function RecipeDetail() {
  let params = useParams();
  let recipe = getRecipeById(parseInt(params.recipeId, 10));

  return (
    <>
      <div className="recipe-detail-container">
        <img src={recipe.image} className="cover-img" />
        <p>{recipe.title}</p>
        <h2>Ingredients</h2>
        <p>Servings {recipe.servings}</p>
        <IngredientList ingredients={recipe.extendedIngredients} />
        <h2>Instructions</h2>
        <InstructionList instructions={recipe.analyzedInstructions[0].steps}/>
      </div>
      <div>
        <h2>Similar recipes</h2>
        <RecipeList number={5} />
      </div>
    </>
  )
}
