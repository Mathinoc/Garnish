require('dotenv').config();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const baseUrl = 'https://api.spoonacular.com/recipes';
const randomList = '/random?apiKey=';
const apiKey = process.env.API_KEY2;

async function randomRecipes(req, res) {
  try {
    const resultFromApi = await fetch(
      `${baseUrl}${randomList}${apiKey}&number=${20}`
    );
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);
  } catch (error) {
    console.log('randomRecipes()', error);
    res.sendStatus(500);
  }
}

async function recipeUrl(req, res) {
  try {
    const recipeUrl = req.query.url;
    const resultFromApi = await fetch(
      `${baseUrl}/extract?apiKey=${apiKey}&url=${recipeUrl}`
    );
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);
  } catch (error) {
    console.log('recipeById()', error);
    res.sendStatus(500);
  }
}

async function recipesIds(req, res) {
  try {
    const recipeIds = req.params.ids;
    const resultFromApi = await fetch(
      `${baseUrl}/informationBulk?apiKey=${apiKey}&ids=${recipeIds}`
    );
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);
  } catch (error) {
    console.log('recipeById()', error);
    res.sendStatus(500);
  }
}

async function recipeById(req, res) {
  try {
    const recipeId = req.params.id;
    const resultFromApi = await fetch(
      `${baseUrl}/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`
    );
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);
  } catch (error) {
    console.log('recipeById()', error);
    res.sendStatus(500);
  }
}

async function similarRecipes(req, res) {
  try {
    const baseId = req.params.id;
    const resultFromApi = await fetch(
      `${baseUrl}/${baseId}/similar?apiKey=${apiKey}&includeNutrition=true&number=${3}`
    );
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);
  } catch (error) {
    console.log('randomRecipes()', error);
    res.sendStatus(500);
  }
}

async function recipeByName(req, res) {
  try {
    const query = req.query.search ? `query=${req.query.search}` : false;

    const diet = req.query.vegetarian === "true" ? `diet=vegetarian` : false;

    let intolerancesArray = [];
    req.query.gluten === "true" && intolerancesArray.push('gluten');
    req.query.dairy === "true" && intolerancesArray.push('dairy');

    const url = `${baseUrl}/complexSearch?apiKey=${apiKey}${
      query ? '&' + query : ''
    }${
      diet ? '&' + diet : ''
    }&intolerances=[${intolerancesArray}]&number=${20}`;

    const resultFromApi = await fetch(url);
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);
  } catch (error) {
    console.log('controller recipeByName()', error);
    res.status(500).send();
  }
}

module.exports = {
  randomRecipes,
  recipeById,
  similarRecipes,
  recipeByName,
  recipesIds,
  recipeUrl,
};
