'use strict';

module.exports = {
  bodyParser     : require('body-parser'),
  compress       : require('compression'),
  csurf          : require('csurf'),
  flash          : require('connect-flash'),
  logger         : require('morgan'),
  methodOverride : require('method-override'),
  session        : require('express-session'),
  _404           : require('../../lib/middleware/404.js'),
  errorHandler   : require('../../lib/middleware/error-handler.js')
};
