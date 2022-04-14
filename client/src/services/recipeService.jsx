const baseUrl = 'https://api.spoonacular.com/recipes';
const randomList = `/random?apiKey=${process.env.REACT_APP_API_KEY}`;

import getRandomRecipes from './../data.js';

export function getRandomRecipes (number) {
  return getRandomRecipes(number)
}