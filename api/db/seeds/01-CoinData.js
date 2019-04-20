const { coinData } = require('../../../scraper/scraper');

async function getCoinData() {
  try {
    const scraperResponse = await coinData;
    return scraperResponse;
  } catch (err) {
    throw err;
  }
}

exports.seed = async function insertCoinData(knex) {
  const coinDataRes = await getCoinData();
  try {
    await knex('Coins').truncate();
    let [startSlice, stopSlice, counter] = [0, 50, coinDataRes.length];
    while (counter > 0) {
      // eslint-disable-next-line no-await-in-loop
      await knex('Coins').insert(coinDataRes.slice(startSlice, stopSlice));
      startSlice += 50;
      stopSlice += 50;
      counter -= 50;
    }
  } catch (err) {
    throw err;
  }
};
