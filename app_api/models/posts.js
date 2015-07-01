'use strict';

// Module dependencies
var mongoose         = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// TODO: Add permalinks.
// Define post schema
var postSchema = new mongoose.Schema({
  subject: {
    type     : String,
    trim     : true,
    required : 'Subject cannot be blank.'
  },
  author: {
    type     : mongoose.Schema.Types.ObjectId,
    ref      : 'User',
    trim     : true,
    required : 'Author cannot be blank.'
  },
  created: {
    type      : Date,
    'default' : Date.now
  },
  body: {
    type     : String,
    required : 'Post body cannot be blank.'
  },
  boardID: {
    type     : mongoose.Schema.Types.ObjectId,
    ref      : 'Board',
    required : 'BoardID cannot be blank.'
  }
});

// Add paginate plugin
postSchema.plugin(mongoosePaginate);

// Note: Required by index.js
mongoose.model('Post', postSchema);
