const { Router } = require('express');
const { randomRecipes, recipeById, similarRecipes } = require('./controllers/index_controller.js');

const router = Router();

router
.post('/recipes', randomRecipes)
.post('/recipe/:id', recipeById)
.post('/similar-recipe/:id', similarRecipes)
// router.delete('/delete', message.delMessage)

module.exports = router;
