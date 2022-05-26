import {getRandomRecipes} from './../data.js';
const baseUrl = 'http://localhost:3004'


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
    .then(result => {console.log('In service; response from server'); return result.json(); })
    .then(res => { return res["recipes"]})
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
