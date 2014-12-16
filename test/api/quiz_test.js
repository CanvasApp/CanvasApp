'use strict';

process.env.MONGO_URL = 'mongodb://localhost/quiz_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var Quiz = require('../../models/quiz_model.js');
var User = require('../../models/user_model.js');
chai.use(chaihttp);

require('../../server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

User.collection.remove(function(err) {
  if (err) throw (err);
});

Quiz.collection.remove(function(err) {
  if (err) throw (err);
});

describe('all things quiz route', function() {
  var jwtToken;
  var quizcode;

  //create a user
  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({username:'test6@example.com', password:'foobar123'})
    .end(function(res) {
      jwtToken = res.body.jwt;
      console.log(jwtToken);
      done();
    });
  });

  //create an admin
  before(function(done) {
    chai.request(localhost)
    .put('/api/confirmadmin')
    .set({jwt:jwtToken})
    .end(function(err, res) {
      if (err) res.status(500).send('error');
      console.log(res.body);
      done();
    });
  });

  it('should be able to create a question', function(done) {
    chai.request(localhost)
      .post('/api/quiz')
      .set({jwt: jwtToken})
      .send({
        quizQuestion: {
          question: 'Are you a bad enough dude to save the president?',
          questionValue: {
            javascript: true,
            python: true,
            ruby: false,
            objectiveC: false
          }
        }
      })
      .end(function(err, res) {
        quizcode = res.body.code;
        expect(err).to.eql(null);
        expect(res.body).to.have.property('quizQuestion');
        console.log(res.body);
        done();
      });
  });

  it('should be able to get all of the questions', function(done) {
    chai.request(localhost)
      .get('/api/quizzes')
      .set({jwt: jwtToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.equal(true);
        done();
      });
  });

  it('should be able to get a single question', function(done) {
    chai.request(localhost)
      .get('/api/quiz/' + quizcode)
      .set({jwt: jwtToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('quizQuestion');
        done();
      });
  });

  it('should be able to update a question', function(done) {
    chai.request(localhost)
      .put('/api/quiz/' + quizcode)
      .set({jwt: jwtToken})
      .send({
        quizQuestion: {
          question: 'Are you a bad enough dude to save the world?',
          questionValue: {
            javascript: false,
            python: false,
            ruby: true,
            objectiveC: true
          }
        }
      })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.equal('quiz question updated');
        done();
      });
  });

  it('should be able to delete a question', function(done) {
    chai.request(localhost)
      .delete('/api/quiz/' + quizcode)
      .set({jwt: jwtToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.equal('The ether has enveloped the question and it is lost to humanity');
        done();
      });
  });
});
