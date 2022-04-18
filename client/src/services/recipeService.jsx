const baseUrl = 'https://api.spoonacular.com/recipes';
const randomList = `/random?apiKey=${process.env.REACT_APP_API_KEY}`;
const parseUrl = 'http://localhost.3001/parse';

import getRandomRecipes from './../data.js';

export function getRandomRecipes (number) {
  return getRandomRecipes(number)
}

export function getParsedRecipe (url) {
  return fetch(parseUrl, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(url)
  })
    .then(result => result.json())
    .catch(error => console.error(error))
}