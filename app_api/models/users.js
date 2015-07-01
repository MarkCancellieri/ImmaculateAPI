'use strict';

// Module dependencies
var crypto           = require('crypto');
var mongoose         = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// Define user schema
var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type  : String,
    match : [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  username: {
    type     : String,
    unique   : true,
    required : 'Username is required',
    trim     : true
  },
  password: {
    type     : String,
    validate : [
      function(password) {
        return password && password.length > 6;
      }, 'Password should be longer than 6 characters'
    ]
  },
  salt: {
    type: String
  },
  provider: {
    type     : String,
    required : 'Authentication provider is required'
  },
  providerId: String,
  providerData: {},
  created: {
    type    : Date,
    default : Date.now
  }
});

// Set the 'fullname' virtual property
userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName  = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName  = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
userSchema.pre('save', function(next) {
  if (this.password) {
    this.salt     = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

// Create an instance method for hashing a password
userSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Create an instance method for authenticating user
userSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

// Find possible not used username
userSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;

  // Add a 'username' suffix
  var possibleUsername = username + (suffix || '');

  // Use the 'User' model 'findOne' method to find an available unique username
  _this.findOne({
    username : possibleUsername
  }, function(err, user) {
    // If an error occurs call the callback with a null value, otherwise find an
    // available unique username
    if (!err) {
      // If an available unique username was found call the callback method,
      // otherwise call the 'findUniqueUsername' method again with a new suffix
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

// Configure the 'userSchema' to use getters and virtuals when transforming to JSON
userSchema.set('toJSON', {
  getters  : true,
  virtuals : true
});

// Add paginate plugin
userSchema.plugin(mongoosePaginate);

// Note: Required by index.js
mongoose.model('User', userSchema);
