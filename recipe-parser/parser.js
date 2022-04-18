const recipeDataScraper = require('recipe-data-scraper');


$(document).ready( () => {
  $('#parseForm').on("submit", (event) => {
    event.preventDefault();
    let urlToParse = $('#parseForm #url').val();
    recipeDataScraper(urlToParse)
      .then((recipe) => res.json({ recipe }))
      .then(el => console.log(el))
      .catch((err) => res.status(500).json({ message: err.message }));
  })
})

