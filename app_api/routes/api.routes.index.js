'use strict';

// Module dependencies
var express          = require('express');
var router           = express.Router();
var boardsController = require('../controllers/api.controllers.boards');
var postsController  = require('../controllers/api.controllers.posts');
var usersController  = require('../controllers/api.controllers.users');

// Board API routes
router.get('/api/boards', boardsController.getListOfBoards);
router.post('/api/boards', boardsController.createBoard);

// Post API routes

// User API routes

module.exports = router;
