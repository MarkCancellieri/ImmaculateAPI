'use strict';

var errorHandler;

// Development error handler (will display stack trace)
function developmentErrorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message : err.message,
    error   : err
  });
}

// Production error handler (no stack traces leaked to user)
function productionErrorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message : err.message,
    error   : {}
  });
}

if (process.env.NODE_ENV === 'development') {
  errorHandler = developmentErrorHandler;
} else {
  errorHandler = productionErrorHandler;
}

module.exports = errorHandler;
