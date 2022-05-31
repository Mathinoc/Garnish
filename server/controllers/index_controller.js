require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const baseUrl = 'https://api.spoonacular.com/recipes';
const randomList = '/random?apiKey=';
const apiKey = process.env.API_KEY1 ;


async function randomRecipes (req, res) {
  console.log('randomRecipes()', req.body.number)
  try {
    const numberOfRecipes = req.body.number;
    const resultFromApi = await fetch(`${baseUrl}${randomList}${apiKey}&number=${numberOfRecipes}`);
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);

  } catch (error) {
    console.log('randomRecipes()', error)
    res.sendStatus(500);
  }
}

async function recipeUrl (req,res) {
  console.log("getRecipeById()_id: ", req.body.urlRecipe)
  try {
    const recipeUrl = req.body.urlRecipe;  
    const resultFromApi = await fetch(`${baseUrl}/extract?apiKey=${apiKey}&url=${recipeUrl}`);
    const parsedResult = await resultFromApi.json();
    console.log("parsed Url recipe", parsedResult)
    res.status(200).json(parsedResult);

  } catch (error) {
    console.log('recipeById()', error)
    res.sendStatus(500);
  }
}

async function recipesIds (req,res) {
  try {
    const recipeIds = req.body ;
    const idString = recipeIds.join(',');
    const resultFromApi = await fetch(`${baseUrl}/informationBulk?apiKey=${apiKey}&ids=${idString}`);
    const parsedResult = await resultFromApi.json();
    console.log("parsedResult IDs", parsedResult)
    res.status(200).json(parsedResult);

  } catch (error) {
    console.log('recipeById()', error)
    res.sendStatus(500);
  }
}

async function recipeById (req, res) {
  console.log("getRecipeById()_id: ", req.params.id)
  try {
    console.log('FETCH ONCE')
    const recipeId = req.params.id;  
    const resultFromApi = await fetch(`${baseUrl}/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`);
    const parsedResult = await resultFromApi.json();
    // console.log("parsed ID recipe", parsedResult)
    res.status(200).json(parsedResult);

  } catch (error) {
    console.log('recipeById()', error)
    res.sendStatus(500);
  }
}

async function similarRecipes(req, res) {
  console.log("similarRecipes(): ", req.params.baseId)
  try {
    const numberOfRecipes = req.body.number;
    console.log('typeof numberofresult', typeof numberOfRecipes)
    const baseId = req.params.baseId;
    console.log('baseId', baseId)
    const resultFromApi = await fetch(`${baseUrl}/${baseId}/similar?apiKey=${apiKey}&includeNutrition=true&number=${numberOfRecipes}`); // ${numberOfRecipes}
    const parsedResult = await resultFromApi.json();
    console.log('resultFromApi', parsedResult)
    res.status(200).json(parsedResult);

  } catch (error) {
    console.log('randomRecipes()', error)
    res.sendStatus(500);
  }
}

async function recipeByName (req, res) {
  console.log("recipeByName(): ", req.body.number)

  try {
    const searchDetails = req.body;
    const count = searchDetails.number;
    const query = searchDetails.search ? `query=${searchDetails.search}` : false;
    const diet = searchDetails.vegetarian ? `diet=vegetarian` : false;
    let intolerancesArray=[];
    (searchDetails.gluten === true) && intolerancesArray.push('gluten');
    searchDetails.dairy === true && intolerancesArray.push('dairy');

    const url = `${baseUrl}/complexSearch?apiKey=${apiKey}${query? '&'+query:''}${diet? '&'+diet:''}&intolerances=[${intolerancesArray}]&number=${count}`
    console.log("searchDetails", searchDetails)
    console.log('in controller details', url)
    const resultFromApi = await fetch(url);
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);
  } catch (error) {
    console.log('controller recipeByName()', error)
    res.status(500).send();
  }
}


module.exports = { randomRecipes, recipeById, similarRecipes, recipeByName, recipesIds, recipeUrl }