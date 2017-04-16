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

describe('test the api', function() {
  var jwtToken;

  it('should get a basic route', function(done) {
    chai.request(localhost)
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.equal('hello world');
        done();
      });
  });

  it('should create a user', function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'test@example.com', password:'Foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      jwtToken = res.body.jwt;
      done();
    });
  });

  it('should get all of the users', function(done) {
    chai.request(localhost)
    .get('/api/allusers')
    .set({jwt: jwtToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should get a user', function(done) {
    chai.request(localhost)
    .get('/api/user')
    .set({jwt: jwtToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      console.log(res.body);
      expect(res.body).to.have.property('_id');
      done();
    });
  });

  it('should update user info', function(done) {
    chai.request(localhost)
    .put('/api/userinfo')
    .set({jwt: jwtToken})
    .send({userinfo:{name:'joe', phone:'555-444-3333'}})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('user updated');
      done();
    });
  });

});
