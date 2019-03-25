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
      markCap.push(
        parseInt(num.substring(2, num.length - 1).replace(/,/g, ''), 10),
      );
    }
  });

  // price
  let usdPrice = [];
  function regexPriceMethods(string, i) {
    // grabs between quotations
    return string.match(/(['"])([ ]?.)*?\1/g)[i];
  }
  siteData[4].forEach((num) => {
    if (num !== 'Price') {
      usdPrice.push(
        regexPriceMethods(num, 2).substring(
          1,
          regexPriceMethods(num, 2).length - 1,
        ),
      );
    }
  });
  usdPrice = usdPrice.map((p) => Number(Number(p).toFixed(2)));

  // btc_price
  let btcPrice = [];
  siteData[4].forEach((num) => {
    if (num !== 'Price') {
      btcPrice.push(
        regexPriceMethods(num, 3).substring(
          1,
          regexPriceMethods(num, 3).length - 1,
        ),
      );
    }
  });
  btcPrice = btcPrice.map((p) => Number(Number(p).toFixed(3)));

  // circulating supply
  const circulation = [];
  siteData[5].forEach((num) => {
    let numMatch = num.match(/>(.*?)</g);
    if (numMatch !== null) {
      numMatch = numMatch.toString().replace(/,/g, '');
      circulation.push(
        parseInt(numMatch.substring(1, numMatch.length - 1), 10),
      );
    }
  });

  // volume (24h)
  const volume = [];
  siteData[6].forEach((num) => {
    let volMatch = num.match(/>(.*?)</g);
    if (volMatch !== null && volMatch[0] !== '>?<') {
      volMatch = volMatch[0].substring(1, volMatch[0].length - 1);
      volMatch = volMatch.substring(1, volMatch.length).replace(/,/g, '');
      volume.push(parseFloat(volMatch));
    }
  });

  // fluc (1h)
  const flucHour = [];
  siteData[7].forEach((num) => {
    const flucMatch = parseFloat(num.substring(0, num.length - 1));
    if (!Number.isNaN(flucMatch)) {
      flucHour.push(flucMatch);
    }
  });

  // fluc (day)
  const flucDay = [];
  siteData[8].forEach((num) => {
    const flucMatch = parseFloat(num.substring(0, num.length - 1));
    if (!Number.isNaN(flucMatch)) {
      flucDay.push(flucMatch);
    }
  });

  // fluc (week)
  const flucWeek = [];
  siteData[9].forEach((num) => {
    const flucMatch = parseFloat(num.substring(0, num.length - 1));
    if (!Number.isNaN(flucMatch)) {
      flucWeek.push(flucMatch);
    }
  });
});

module.exports = {
  coinData,
};
