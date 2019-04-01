const { coinData } = require('../scraper/scraper.js');

const test = async function fetchCoinData() {
  try {
    const scraperData = await coinData;
    console.log('SC1', scraperData);
    return scraperData;
  } catch (err) {
    throw err;
  }
};
test();
