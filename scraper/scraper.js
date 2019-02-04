require('dotenv').config({ PATH: '../.env' });
const request = require('request-promise');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

const { URL, className } = process.env;

const coinData = request(URL, (e, res, html) => {
  let siteData = [];
  if (!e && res.statusCode === 200) {
    const $ = cheerio.load(html);
    cheerioTableparser($);
    siteData = $(className).parsetable(true);
  }

  // symbols
  const symbolArr = [];
  siteData[1].forEach((name) => {
    // name is an html element
    // use regex to grab what we want
    if (name.match(/\/">(.*?)</g) !== null) {
      symbolArr.push(
        name
          .match(/\/">(.*?)</g)
          .toString()
          .replace(/[<>/"]/g, '')
          .split(',')[0],
      );
    }
  });
});
