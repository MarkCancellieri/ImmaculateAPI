'use strict';

// Module dependencies
var express    = require('express');
var config     = require('../config');
var middleware = require('../middleware');

// Define the Express configuration function
function configureExpressApp() {
  // Create a new Express application instance
  var app = express();

  // Remove 'X-Powered-By' header
  app.set('x-powered-by', false);

  // Configure middleware
  if (process.env.NODE_ENV === 'development') {app.use(middleware.logger('dev'));}
  if (process.env.NODE_ENV === 'production')  {app.use(middleware.compress());}
  app.use(middleware.bodyParser.json());
  app.use(middleware.bodyParser.urlencoded({extended: true}));
  app.use(middleware.methodOverride());
  app.use(middleware.session({      // TODO: Add Mongo/Redis session store
    saveUninitialized : true,
    resave            : true,       // TODO: Review resave option
    secret            : config.sessionSecret
  }));
  // app.use(middleware.csurf()) TODO: figure out how to use this!
  app.use(middleware.flash());

  // Load routes
  app.use('/', require('../../app_api/routes'));

  // 404 handler
  app.use(middleware._404);

  // error handler
  app.use(middleware.errorHandler);

  // Return the Express app instance
  return app;
}

module.exports = configureExpressApp;
