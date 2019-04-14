const { responseStatus } = require('../routes/resStatus.js');

function errHandler(err, req, res) {
  switch (err.code) {
    case responseStatus.badRequest:
      res.status(responseStatus.badRequest).json({
        message: 'Request cannot be understood or processed.',
      });
      break;
    case responseStatus.notFound:
      res.status(responseStatus.notFound).json({
        message: 'That coin cannot be found.',
      });
      break;
    case responseStatus.notAcceptable:
      res.status(responseStatus.notAcceptable).json({
        message: 'Missing one or more required fields.',
      });
      break;
    default:
      res.status(responseStatus.internalErr).json({
        message: 'There was an error while performing this operation.',
      });
  }
}

module.exports = {
  errHandler,
};
