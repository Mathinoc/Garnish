import React from 'react';
import CreateRecipeForm from './CreateRecipeForm';
import './../../styling/myRecipes/MyRecipes.css';
import MyRecipesList from './MyRecipesList';
import { useState, useEffect } from 'react';


export default function MyRecipes() {
  const [personalRecipes, setPersonalRecipes] = useState(() => (
    localStorage.getItem("personalRecipes")
  ))

  return (
    <div className="my-recipes-container">
      <CreateRecipeForm setPersonalRecipes={setPersonalRecipes}/>
      <MyRecipesList personalRecipes={personalRecipes} setPersonalRecipes={setPersonalRecipes}/>
    </div>
  )
}
