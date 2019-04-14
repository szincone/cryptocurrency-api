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
    let [startSlice, stopSlice, counter] = [1, 150, coinDataRes.length];
    // console.log('LALA', startSlice, stopSlice, 'end slice', counter);
    while (counter > 0) {
      await knex('Coins').insert(coinDataRes.slice(startSlice, stopSlice));
      startSlice += 150;
      stopSlice += 150;
      counter -= 150;
    }
    // await knex('Coins').insert(coinDataRes.slice(1, 150));
    // await knex('Coins').insert(coinDataRes.slice(150, 300));
    // await knex('Coins').insert(coinDataRes.slice(300, 450));
    // if (coinDataRes.length - 450 <= coinDataRes.length) {
    //   await knex('Coins').insert(coinDataRes.slice(450, 600));
    // } else if (
    //   coinDataRes.length - 600 <= coinDataRes.length &&
    //   coinDataRes.length - 600 > 0
    // ) {
    //   await knex('Coins').insert(coinDataRes.slice(600, 750));
    // } else if (
    //   coinDataRes.length - 750 <= coinDataRes.length &&
    //   coinDataRes.length - 750 > 0
    // ) {
    //   await knex('Coins').insert(coinDataRes.slice(750));
    // }
  } catch (err) {
    throw err;
  }
};
