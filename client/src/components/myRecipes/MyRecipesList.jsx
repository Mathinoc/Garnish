import React from 'react'

export default function MyRecipesList({personalRecipes, setPersonalRecipes}) {
  console.log('recipe', personalRecipes)
  return (
    <div>
      {personalRecipes && personalRecipes.map(el => {
        console.log(el)
      })}

    </div>
  )
}
