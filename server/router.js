const { Router } = require('express');
const {
  randomRecipes,
  recipeById,
  similarRecipes,
  recipeByName,
  recipesIds,
  recipeUrl,
} = require('./controllers/index_controller.js');

const router = Router();

router
  .get('/recipes', randomRecipes)
  .get('/recipes/:id', recipeById)
  .get('/recipes/:id/similar', similarRecipes)
  .get('/search', recipeByName)
  .get('/recipes/ids/:ids', recipesIds)
  .get('/recipe/external', recipeUrl);

module.exports = router;
