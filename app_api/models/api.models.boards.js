'use strict';

// Module dependencies
var mongoose         = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// Define board schema
var boardSchema = new mongoose.Schema({
  name: {
    type     : String,
    trim     : true,
    required : 'Board name cannot be blank.'
  },
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

// Add paginate plugin
boardSchema.plugin(mongoosePaginate);

// Note: Required by api.models.index.js
mongoose.model('Board', boardSchema);
