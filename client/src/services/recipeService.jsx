import { getMockedRandomRecipes } from './../data.js';
import { urlParams } from './../utils/urlParams.ts';
const baseUrl = process.env.REACT_APP_BASE_URL || "";


export function scrapeData(url) {
  return fetch(`${baseUrl}/recipe/external?url=${url}`)
    .then(res => res.json())
    .catch(e => console.log('error in service file', e))
}


export function getRecipeInMyList(ids) {
  return fetch(`${baseUrl}/recipes/ids/${ids.join(',')}`)
    .then(res => res.json())
    .catch(e => console.log('error in service file', e))
}

export function getSearchResults(searchDetails) {
  const searchParams = urlParams(searchDetails);
  return fetch(`${baseUrl}/search${searchParams}`)
    .then(res => res.json())
    .catch(e => console.log('error in service file', e));
}

export function getRandomRecipes() {
  //! API
  return fetch(`${baseUrl}/recipes`)
    .then(res => res.json())
    .then(res => res["recipes"])
    .catch(e => console.log('error in service file', e))

  //! from saved data
  // return getRandomRecipes(10)
}


export function getRecipeById(id) {
  //   //! API
  return fetch(`${baseUrl}/recipes/${id}`)
    .then(res => res.json())
    .catch(e => console.log('error in service file', e))
}


export function getSimilarRecipes(id) {
  //   //! API
  return fetch(`${baseUrl}/recipes/${id}/similar`)
    .then(res => res.json())
    .catch(e => console.log('error in service file', e))
}
