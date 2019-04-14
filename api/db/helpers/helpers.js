const db = require('../config');

module.exports = {
  async getCoins() {
    return db('Coins').select();
  },

  async getCoin(id) {
    return db('Coins')
      .where({
        id,
      })
      .select();
  },
};
