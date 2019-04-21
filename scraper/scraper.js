require('dotenv').config({ PATH: '../api/.env' });
const request = require('request-promise');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

const { URL, className } = process.env;

const coinArr = [];
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
      const convertedNum = parseInt(
        num.substring(2, num.length - 1).replace(/,/g, ''),
        10,
      );
      if (!Number.isNaN(convertedNum)) {
        markCap.push(convertedNum);
      } else {
        markCap.push(0);
      }
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
  usdPrice = usdPrice.map((p) => Number(Number(p).toFixed(5)));

  // circulating supply
  const circulation = [];
  siteData[5].forEach((num) => {
    let numMatch = num.match(/>(.*?)</g);
    if (numMatch !== null) {
      numMatch = numMatch.toString().replace(/,/g, '');
      numMatch = parseInt(numMatch.substring(1, numMatch.length - 1), 10);
      if (!Number.isNaN(numMatch)) {
        circulation.push(numMatch);
      } else {
        circulation.push(0);
      }
    }
  });

  // volume (24h)
  const volume = [];
  siteData[6].forEach((num, i) => {
    let volMatch = num.match(/>(.*?)</g);
    [volMatch] = volMatch === null ? ['>0<'] : volMatch;
    volMatch = volMatch.substring(1, volMatch.length);
    volMatch = volMatch.substring(1, volMatch.length - 1).replace(/,/g, '');
    volMatch = parseFloat(volMatch);
    if (i > 0) {
      if (Number.isNaN(volMatch)) {
        volume.push(0);
      } else {
        volume.push(volMatch);
      }
    }
  });

  // fluc (1h)
  const flucHour = [];
  siteData[7].forEach((num, i) => {
    let flucMatch = num.substring(0, num.length - 1);
    flucMatch = parseFloat(flucMatch);
    if (i > 0) {
      if (Number.isNaN(flucMatch)) {
        flucHour.push(0);
      } else {
        flucHour.push(flucMatch);
      }
    }
  });

  // fluc (day)
  const flucDay = [];
  siteData[8].forEach((num, i) => {
    let flucMatch = num.substring(0, num.length - 1);
    flucMatch = parseFloat(flucMatch);
    if (i > 0) {
      if (Number.isNaN(flucMatch)) {
        flucDay.push(0);
      } else {
        flucDay.push(flucMatch);
      }
    }
  });

  // fluc (week)
  const flucWeek = [];
  siteData[9].forEach((num, i) => {
    let flucMatch = num.substring(0, num.length - 1);
    flucMatch = parseFloat(flucMatch);
    if (i > 0) {
      if (Number.isNaN(flucMatch)) {
        flucWeek.push(0);
      } else {
        flucWeek.push(flucMatch);
      }
    }
  });

  // pop object data
  nameArr.forEach((name, i) => {
    const coin = {
      symbol: symbolArr[i],
      name: nameArr[i],
      market_cap: markCap[i],
      usd_price: usdPrice[i],
      circulation: circulation[i],
      volume: volume[i],
      fluc_h: flucHour[i],
      fluc_d: flucDay[i],
      fluc_w: flucWeek[i],
    };
    coinArr.push(coin);
  });
})
  .then(() => coinArr)
  .catch((err) => {
    throw err;
  });

module.exports = {
  coinData,
};
