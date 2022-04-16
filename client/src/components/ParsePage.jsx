import React from 'react';
const request = require("request-promise");
const cheerio = require("cheerio");

export default function ParsePage() {
  let $;
  function parseUrl (event) {
    event.preventDefault();
    request((event.target.url).toString(), (error, response, html) => {
      if (!error && response.statusCode===200) {
        $ = cheerio.load(html);
      }
    })
  }
  return (
    <div className="parse-container">
      <form>
        <input name="url" placeholder='URL...' />
        <button onClick={parseUrl}>Get recipe!</button>
      </form>
    </div>
  )
}
