'use strict';

// 404 handler
module.exports = function(req, res, next) {
  res.status(404).json({message: 'Not found'});
};
