'use strict';

process.env.MONGO_URL = 'mongodb://localhost/users_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var User = require('../../models/user_model.js');
chai.use(chaihttp);

require('../../server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

User.collection.remove(function(err) {
  if (err) throw(err);
});

describe('the teacher test', function() {
  var jwtToken;

  //creates a user
  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'test1@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) res.status(500).send(err);
      jwtToken = res.body.jwt;
      console.log(jwtToken);
      done();
    });
  });

  it('should be able to create a teacher', function(done) {
    chai.request(localhost)
    .post('/api/confirmteacher')
    .set({jwt: jwtToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      console.log(res.body);
      expect(res.body.msg).to.equal('confirmed user is teacher');
      done();
    });
  });

  it('should be able to remove a teacher', function(done) {
    chai.request(localhost)
    .post('/api/unconfirmteacher')
    .set({jwt: jwtToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('teacher has been removed from this plane of existence');
      done();
    });
  });

});
