require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const baseUrl = 'https://api.spoonacular.com/recipes';
const randomList = '/random?apiKey=';
// const apiKey1 = process.env.API_KEY1//"55eeca7c79ed4392ad80a376bc7f5a84";//process.env.API_KEY;
const apiKey2 = process.env.API_KEY1//"868b897a280b4429b590b0e7ec66a142"


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
    const resultFromApi = await fetch(`${baseUrl}/${baseId}/similar?apiKey=${apiKey2}&includeNutrition=true&number=2`); // ${numberOfRecipes}
    const parsedResult = await resultFromApi.json();
    res.status(200).json(parsedResult);

  } catch (error) {
    console.log('randomRecipes()', error)
    res.sendStatus(500);
  }
}



module.exports = { randomRecipes, recipeById, similarRecipes }


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