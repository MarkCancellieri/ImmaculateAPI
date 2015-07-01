'use strict';

// Module dependencies (See mocha.opts for global dependencies)
var request  = require('supertest');
var server   = require('../../server.js');
var mongoose = require('mongoose');
var Board    = mongoose.model('Board');

describe('getListOfBoards controller', function() {
  var newBoardData1 = {name: 'New One of a Kind Board'};
  var newBoardData2 = {name: 'New Really Awesome Board'};

  before(function() {
    // Create new boards to retrieve
    request(server).post('/api/boards').send(newBoardData1).end(function(err, res) {
      if (err) {console.log(err);}
    });
    request(server).post('/api/boards').send(newBoardData2).end(function(err, res) {
      if (err) {console.log(err);}
    });
  });

  after(function() {
    // Remove new boards after tests are completed
    Board.remove({name: newBoardData1.name}, function(err) {
      if (err) {console.log(err);}
    });
    Board.remove({name: newBoardData2.name}, function(err) {
      if (err) {console.log(err);}
    });
  });

  it('should get a list of boards', function(done) {
    request(server)
      .get('/api/boards')
      .expect(function(response) {
        response.body.boards.length.should.equal(2);
      })
      .expect(200, done);
  });
});
