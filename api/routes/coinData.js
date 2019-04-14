const express = require('express');
const helpers = require('../db/helpers/helpers');

const router = express.Router();
const { responseStatus } = require('./resStatus');

// gets
router.get('/', async (req, res, next) => {
  try {
    const coinsData = await helpers.getCoins();
    res.status(responseStatus.success).json(coinsData);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const coinData = await helpers.getCoin(id);
    if (coinData.length > 0) {
      res.status(responseStatus.success).json(coinData);
    } else {
      responseStatus.code = responseStatus.notFound;
      next(responseStatus);
    }
  } catch (err) {
    next(err);
  }
});
// end gets

module.exports = router;
