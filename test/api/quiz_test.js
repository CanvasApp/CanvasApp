'use strict';

process.env.MONGO_URL = 'mongodb://localhost/quiz_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var Quiz = require('../../models/quiz_model.js');
require('../../models/user_model.js');
chai.use(chaihttp);

require('../../server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

Quiz.collection.remove(function(err) {
  if (err) throw(err);
});

describe('all things quiz route', function() {
  var jwtToken;
  console.log(jwtToken);

  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({username:'test6@example.com', password:'foobar123'})
    .end(function(res) {
      jwtToken = res.body.jwt;
      done();
    });
  });
  console.log(jwtToken);
  it('should be able to create question and options', function(done) {
    console.log(jwtToken);
    chai.request(localhost)
    .post('api/quiz')
    .set({jwt: jwtToken})
    .send({
      question: 'This is a question',
      answers: {
        javascript: 'you like javascript?',
        python: 'You like python?',
        ruby: 'you like ruby?',
        objective: 'you like obj-C?'
      }
    })
    .end(function(err, res) {
      expect(res.body.question).to.have.string('This is a question');
      expect(res.body.answers.javascript).to.have.string('you like javascript?');
      expect(res.body.answers.python).to.have.string('You like python?');
      expect(res.body.answers.ruby).to.have.string('you like ruby?');
      expect(res.body.answers.objective).to.have.string('you like obj-C?');
      done();
    });
  });
});
