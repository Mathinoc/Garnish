import {getRandomRecipes} from './../data.js';
const baseUrl = process.env.REACT_APP_BASE_URL || "";


export function scrapeData (urlRecipe) {
  return fetch(`${baseUrl}/recipe-url`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({'urlRecipe':urlRecipe})
  })
  .then(result => {
    return result.json()
  })
  .catch(e => console.log('error in service file', e))
}


export function getRecipeInMyList (ids) {
  return fetch(`${baseUrl}/recipes-id`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids)
  })
  .then(result => result.json())
  .catch(e => console.log('error in service file', e))
}

export function getSearchResults (searchDetails) {
  return fetch(`${baseUrl}/recipe-by-name`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchDetails)
  })
  .then(result => result.json())
  .catch(e => console.log('error in service file', e))
}

export function getRandomRecipess (number) {
  // console.log("number in getRandomRecipess()", number)
  //! API
  return fetch(`${baseUrl}/recipes`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"number": number})
  })
    .then(result => result.json())
    .then(res => res["recipes"])
    .catch(e => console.log('error in service file', e))
  
  //! from saved data
  return getRandomRecipes(10)
}


export function getRecipeById (id, filters) {
  // console.log("id in getRecipeById()", id)
//   //! API
  return fetch(`${baseUrl}/recipe/${id}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"filters": filters})
  })
  .then(result => result.json())
  .catch(e => console.log('error in service file', e))
}


export function getSimilarRecipes (id, number) {
  //   //! API
  return fetch(`${baseUrl}/similar-recipe/${id}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"number": number})
  })
  .then(result => result.json())
  .catch(e => console.log('error in service file', e))
}
