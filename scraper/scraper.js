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

  // names
  const nameArr = [];
  siteData[1].forEach((name) => {
    if (name.match(/\/">(.*?)</g) !== null) {
      nameArr.push(
        name
          .match(/\/">(.*?)</g)
          .toString()
          .replace(/[<>/"]/g, '')
          .split(',')[1],
      );
    }
  });

  // marketcap
  const markCap = [];
  siteData[3].forEach((num) => {
    if (num !== 'Market Cap') {
      markCap.push(num.substring(1, num.length - 1));
    }
  });

  // price
  let usdPrice = [];
  function regexPriceMethods(string) {
    // grabs between quotations
    return string
      .match(/(['"])([ ]?.)*?\1/g)
      .toString()
      .split(',');
  }
  siteData[4].forEach((num) => {
    if (num !== 'Price') {
      usdPrice.push(
        regexPriceMethods(num)[2].substring(
          1,
          regexPriceMethods(num)[2].length - 1,
        ),
      );
    }
  });
  usdPrice = usdPrice.map(p => Number(Number(p).toFixed(2)));
});

module.exports = {
  coinData,
};
