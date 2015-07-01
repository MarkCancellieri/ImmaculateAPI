'use strict';

// Module dependencies
var express          = require('express');
var router           = express.Router();
var boardsController = require('../controllers/boards');
var postsController  = require('../controllers/posts');
var usersController  = require('../controllers/users');

// Board API routes
router.get('/api/boards', boardsController.getListOfBoards);
router.post('/api/boards', boardsController.createBoard);

// Post API routes

// User API routes

module.exports = router;
