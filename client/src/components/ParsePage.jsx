import React from 'react';
// const axios = require("axios");
// const cheerio = require("cheerio");
// const fs = require('fs');
// import fs from 'fs';

export default function ParsePage() {
let fetchedData;
  function parseUrl (event) {
    console.log("inside!", event.target.url.value)
    event.preventDefault();
    // const cher = cheerio.load(dataa)
    // console.log(cher)

    // fetch('./../ParsedData.txt')
    //   .then( r => r.text())
    //   .then(t => fetchedData = t)
    //   console.log(typeof fetchedData.toString())
    // const $ = cheerio.load(fetchedData)
    // console.log($)



    // const url = event.target.url.value;
    // const {data} = await axios.get(url, {
    //   headers: {"Access-Control-Allow-Origin": "*"}
    // });
    // const $ = cheerio.load(data)
    // fetchedData = 
    // console.log("fetcheddata", $)


    // fetch('https://movied.herokuapp.com/discover')
    // .then((response) => {
    //     console.log(response);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });


//! API scraper - works
    // const options = {
    //   token: "6972410233AEC621EA604A5FE4166BBB",
    //   url: "https://www.starwars.com/news",
    // };
    
    // axios.post("https://api.scraperbox.com/scrape", options)
    // .then((response) => {
    //   let $ = cheerio.load(response.data);
    //   let articles = [];

    //   $('.news-articles li').each((index, element) => {
    //       articles.push({
    //           title: $(element).find('h2').text().trim()
    //       });
    //   });

    //   fs.writeFile('./articles.json', JSON.stringify(articles), (error) => {
    //       if (error) throw error;
    //   })
    // })
    // .catch((error) => {
    //     console.log(error);
    // });



  }

  return (
    <div className="parse-container">
      <form onSubmit={parseUrl}>
        <input name="url" placeholder='URL...' />
        <button type="submit">Get recipe!</button>
      </form>
    </div>
  )
}
// onClick={parseUrl}