'use strict';

// Module dependencies
var mongoose = require('mongoose');
var config   = require('../config');

// Connect to MongoDB
var db = mongoose.connect(config.mongoURI);

// Monitor Mongoose for connects and disconnects
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + config.mongoURI + '\n');
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// Gracefully shutdown Mongoose
var gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// Listen for application termination and shut down Mongoose gracefully

// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});

// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function() {
    process.exit(0);
  });
});

// Load models
require('../../app_api/models');
