import recipeDataScraper from 'recipe-data-scraper';

async function parseRecipe (ctx) {
  try {
    let recipeElements;
    const url = ctx.request.body;
    recipeDataScraper(url)
      // .then((recipe) => res.json({ recipe }))
      //! stopped here
      .then(result => recipeElements = result)
      .then(result => recipeElements = result)
      .catch((err) => res.status(500).json({ message: err.message })); 
    ctx.body = recipeElements
  } catch (error) {
    console.log(error)
  }
}
module.exports = {parseRecipe}