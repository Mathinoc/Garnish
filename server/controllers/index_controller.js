require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const baseUrl = 'https://api.spoonacular.com/recipes';
const randomList = '/random?apiKey=';
const apiKey2 = process.env.API_KEY1


async function randomRecipes (req, res) {
  console.log('randomRecipes()', req.body.number)
  try {
    const numberOfRecipes = req.body.number  
    const resultFromApi = await fetch(`${baseUrl}${randomList}${apiKey2}&number=${numberOfRecipes}`);
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);

  } catch (error) {
    console.log('randomRecipes()', error)
    res.sendStatus(500);
  }
}

async function recipeById (req, res) {
  console.log("getRecipeById()_id: ", req.params.id)
  try {
    const recipeId = req.params.id;  
    const resultFromApi = await fetch(`${baseUrl}/${recipeId}/information?apiKey=${apiKey2}&includeNutrition=true`);
    const parsedResult = await resultFromApi.json();
    // console.log("parsed ID recipe", parsedResult)
    res.status(200).json(parsedResult);

  } catch (error) {
    console.log('recipeById()', error)
    res.sendStatus(500);
  }
}

async function similarRecipes(req, res) {
  try {
    const numberOfRecipes = req.body.number;
    const baseId = req.params.id;
    const resultFromApi = await fetch(`${baseUrl}/${baseId}/similar?apiKey=${apiKey2}&includeNutrition=true&number=${numberOfRecipes}`); // ${numberOfRecipes}
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);

  } catch (error) {
    console.log('randomRecipes()', error)
    res.sendStatus(500);
  }
}

async function recipeByName (req, res) {
  try {
    const searchDetails = req.body;
    const count = searchDetails.number;
    const query = searchDetails.search ? `query=${searchDetails.search}` : false;
    const diet = searchDetails.vegetarian ? `diet=vegetarian` : false;
    let intolerancesArray=[];
    (searchDetails.gluten === true) && intolerancesArray.push('gluten');
    searchDetails.dairy === true && intolerancesArray.push('dairy');

    const url = `${baseUrl}/complexSearch?apiKey=${apiKey2}${query? '&'+query:''}${diet? '&'+diet:''}&intolerances=[${intolerancesArray}]&number=${count}`
    console.log("searchDetails", searchDetails)
    console.log('in controller details', url)
    //const resultFromApi = await fetch(url);
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);
  } catch (error) {
    console.log('controller recipeByName()', error)
    res.status(500).send();
  }
}



module.exports = { randomRecipes, recipeById, similarRecipes, recipeByName }


// async function parseRecipe (ctx) {
//   try {
//     let recipeElements;
//     const url = ctx.request.body;
//     recipeDataScraper(url)
//       // .then((recipe) => res.json({ recipe }))
//       //! stopped here
//       .then(result => recipeElements = result)
//       .then(result => recipeElements = result)
//       .catch((err) => res.status(500).json({ message: err.message })); 
//     ctx.body = recipeElements
//   } catch (error) {
//     console.log(error)
//   }
// }