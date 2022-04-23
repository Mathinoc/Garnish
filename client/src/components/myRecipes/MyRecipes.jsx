import React from 'react';
import CreateRecipeForm from './CreateRecipeForm';
import './../../styling/myRecipes/MyRecipes.css';
import MyRecipesList from './MyRecipesList';

export default function MyRecipes() {
  return (
    <div className="my-recipes-container">
      <CreateRecipeForm />
      <MyRecipesList />
    </div>
  )
}
