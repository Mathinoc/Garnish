import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import './../styling/RecipeDetail.css';
import IngredientList from './IngredientList';
import InstructionList from './InstructionList';
import SimilarList from './SimilarList';
import { getRecipeById } from './../services/recipeService';
import BarChart from './charts/BarChart';
// import { getRecipeByIdData } from './../data';
import { getRecipeTemplate } from './../data';


export default function RecipeDetail({ myList, toggleHeart }) {

  let { recipeId } = useParams();
  //! data storage
  // let params = useParams();
  // let recipe = getRecipeByIdData(parseInt(params.recipeId, 10));
  // let recipeId = params.recipeId;
  // myList.includes(recipe.id) ? recipe["favorite"] = true : recipe["favorite"] = false;
  //! API
  console.log('recipe ID', recipeId);
  const [recipe, setRecipe] = useState({});
  const [heartToggle, setHeartToggle] = useState();

  useEffect(() => {
    getRecipeById(recipeId, {})
      .then(recipeResult => {
        if (recipeResult['id'] === parseInt(recipeId, 10)) {
          myList.includes(recipeResult['id']) ? recipeResult["favorite"] = true : recipeResult["favorite"] = false;
          console.log('recipeModified', recipeResult);
          setHeartToggle(recipeResult["favorite"])
          setRecipe(recipeResult);
          console.log('recipe ID', recipe);
          return
        }
        alert('Could not get recipe details :/')
      })
      .catch(error => console.log("RecipeDetail()", error))
    // setRecipe(getRecipeTemplate())

  }, [recipeId])

  function handleClick(id) {
    toggleHeart(id);
    setHeartToggle(!heartToggle)
  }

  function nutritionScore(number) {
    if (number < 20) return 'E';
    if (number < 40) return 'D';
    if (number < 60) return 'C';
    if (number < 80) return 'B';
    return 'A'
  }

  return (
    <div className='global-container'>
      <div className="recipe-detail-container">
        <p className="recipe-header-title" >{recipe.title}</p>
        <div className="recipe-detail-top">
          <div className="cover-img-container" style={{ 'background-image': `url(${recipe.image})` }} >
          </div>
          <div className="graph-container" >
            <p>Nutrition Facts</p>
            <p style={{ 'font-size': '12px', 'margin-top': '-5px' }}> <span >/serving</span></p>
            <BarChart recipe={recipe} id="chart-itself" />
          </div>
        </div>

        <div className="recipe-detail-middle">
          <div className="recipe-information" >
            <div className="info-container" >
              <i class="bi bi-clock special-selection"></i>
              <p>{recipe.readyInMinutes} min</p>
            </div>
            <i class="bi bi-dot"></i>
            <div className="info-container">
              <i class="bi bi-people special-selection"></i>
              <p>Servings {recipe.servings}</p>
            </div>
            <i class="bi bi-dot"></i>
            <div className="info-container">
              <i class="bi bi-file-medical special-selection"></i>
              <p>Health score: {nutritionScore(recipe.healthScore)}</p>
            </div>
            <i class="bi bi-dot"></i>
            <div className="step-for-heart-transition" >
              <button className="heart-btn-detail" onClick={() => handleClick(recipe.id)} >
                {heartToggle ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart heart-fill"></i>}
              </button>
            </div>
          </div>
        </div>

        <div className="recipe-detail-bottom">
          <div className="ingredient-class" >
            <h5>Ingredients</h5>
            {recipe.extendedIngredients ?
              <IngredientList ingredients={recipe.extendedIngredients} />
              :
              <p>Couldn't find ingredients</p>
            }
          </div>
          <div className="instruction-class">
            <h5>Instructions</h5>
            {recipe.analyzedInstructions ?
              <InstructionList instructions={recipe.analyzedInstructions[0].steps} />
              :
              <p>Couldn't find instructions</p>
            }
          </div>
        </div>
      </div>
      <div className="recipe-detail-container">
        <p className="recipe-header-title" >Similar recipes</p>
        <SimilarList myList={myList} id={recipeId} number={3} toggleHeart={toggleHeart} />
      </div>
    </div>
  )
}