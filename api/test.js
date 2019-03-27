const { coinData } = require('../scraper/scraper.js');

async function fetchCoinData() {
  try {
    const scraperData = await coinData;
    return coinData;
  } catch (err) {
    throw err;
  }
}
// fetchCoinData();
console.log('SCRAPER DATA', fetchCoinData());
