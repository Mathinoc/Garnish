import {getRandomRecipes} from './../data.js';
const baseUrl = 'http://localhost:3004'

//work in progress
export function getSearchResults (searchDetails) {
  return fetch(`${baseUrl}/recipe-by-name`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchDetails)
  })
  .then(result => result.json())
  .then(res => res["recipes"])
  .catch(e => console.log('error in service file', e))
}


export function getRandomRecipess (number) {
  console.log("number in getRandomRecipess()", number)

  //! API
  // return fetch(`${baseUrl}/recipes`, {
  //   method: 'POST',
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({"number": number})
  // })
  //   .then(result => result.json())
  //   .then(res => res["recipes"])
  //   .catch(e => console.log('error in service file', e))
  
  //! from saved data
  return getRandomRecipes(10);
}

export function getRecipeById (id, filters) {
  console.log("id in getRecipeById()", id)
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




// Work in progress
// export function getParsedRecipe (url) {
//   return fetch(parseUrl, {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(url)
//   })
//     .then(result => result.json())
//     .catch(error => console.error(error))
// }