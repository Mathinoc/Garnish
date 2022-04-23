const { Router } = require('express');
const { randomRecipes, recipeById, similarRecipes, recipeByName } = require('./controllers/index_controller.js');

const router = Router();

router
.post('/recipes', randomRecipes)
.post('/recipe/:id', recipeById)
.post('/similar-recipe/:baseId', similarRecipes)
.post('/recipe-by-name', recipeByName)
// router.delete('/delete', message.delMessage)

module.exports = router;
