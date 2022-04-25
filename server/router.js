const { Router } = require('express');
const { randomRecipes, recipeById, similarRecipes, recipeByName, recipesIds, recipeUrl } = require('./controllers/index_controller.js');

const router = Router();

router
.post('/recipes', randomRecipes)
.post('/recipe/:id', recipeById)
.post('/similar-recipe/:baseId', similarRecipes)
.post('/recipe-by-name', recipeByName)
.post('/recipes-id', recipesIds)
.post('/recipe-url', recipeUrl)

module.exports = router;
