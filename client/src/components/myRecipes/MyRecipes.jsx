import React from 'react';
import CreateRecipeForm from './CreateRecipeForm';
import './../../styling/myRecipes/MyRecipes.css';
import MyRecipesList from './MyRecipesList';
import { useState, useEffect } from 'react';


export default function MyRecipes() {
  const [personalRecipes, setPersonalRecipes] = useState(() => {
    // localStorage.clear();
    const savedJSON = localStorage.getItem("personalRecipes");
    const listParsed = JSON.parse(savedJSON);
    return listParsed || [];
  })
  const [indexRecipeToModify, setIndexRecipeToModify] = useState(false)
  useEffect(() => {
    localStorage.setItem("personalRecipes", JSON.stringify(personalRecipes))
  }, [personalRecipes])

console.log('MYList() indexRecipeToModify', indexRecipeToModify)

  return (
    <div className="my-recipes-container" >
      <CreateRecipeForm
        personalRecipes={personalRecipes}
        setPersonalRecipes={setPersonalRecipes}
        indexRecipeToModify={indexRecipeToModify}
        setIndexRecipeToModify={setIndexRecipeToModify}
      />
      <MyRecipesList
        personalRecipes={personalRecipes}
        setPersonalRecipes={setPersonalRecipes}

        setIndexRecipeToModify={setIndexRecipeToModify}
      />
    </div>
  )
}
