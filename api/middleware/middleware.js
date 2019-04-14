const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const coinData = require('../routes/coinData');
const { errHandler } = require('./errHandler');

module.exports = (server) => {
  server.use(helmet());
  server.use(express.json());
  server.use(morgan('dev'));
  server.use('/coin_data', coinData);
  server.use(errHandler);
};
