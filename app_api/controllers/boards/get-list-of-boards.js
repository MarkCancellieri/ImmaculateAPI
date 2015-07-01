'use strict';

// Module dependencies
var mongoose     = require('mongoose');
var config       = require('../../../config/config');

var Board        = mongoose.model('Board');
var defaultLimit = config.boardPaginateDefaultLimit;
var maxLimit     = config.boardPaginateMaxLimit;

// Get a list of boards
var getListOfBoards = function(req, res) {
  var query = {};
  var page  = parseInt(req.query.page)  || 1;
  var limit = parseInt(req.query.limit) || defaultLimit;
  if (limit > maxLimit) {limit = maxLimit;}

  Board.paginate(query, page, limit, function(error, pageCount, paginatedResults, itemCount) {
    if (error) {
      console.error(error);
    } else {
      res.status(200).json({
        boards    : paginatedResults,
        pageCount : pageCount,
        itemCount : itemCount});
    }
  }, {columns: 'name', sortBy : {name : 1}});
};

module.exports = getListOfBoards;
