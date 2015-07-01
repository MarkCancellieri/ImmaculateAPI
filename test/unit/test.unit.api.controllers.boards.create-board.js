'use strict';

// Module dependencies (See mocha.opts for global dependencies)
var request  = require('supertest');
var server   = require('../../server.js');
var mongoose = require('mongoose');
var Board    = mongoose.model('Board');

describe('createBoard controller', function() {
  var newBoardData = {name: 'New Super Cool Board'};

  after(function() {
    // Remove new board after tests are completed
    Board.remove({name: newBoardData.name}, function(err) {
      if (err) {console.log(err);}
    });
  });

  it('should create a board', function(done) {
    request(server)
      .post('/api/boards')
      .send(newBoardData)
      .expect(function(response) {
        response.body.should.have.property('name', newBoardData.name);
      })
      .expect(201, done);
  });

  it('should return an error without required information', function(done) {
    var newBoardData = {};

    request(server)
      .post('/api/boards')
      .send(newBoardData)
      .expect(function(response) {
        response.body.should.have.property('name', 'ValidationError');
      })
      .expect(500, done);
  });
});
