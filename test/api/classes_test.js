'use strict';

process.env.MONGO_URL = 'mongodb://localhost/classes_test';
var chai = require('chai');
var chaihttp = require('chai-http');
//var Classes = require('./models/classes_model');
chai.use(chaihttp);

require('../../server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

describe('the classes test', function() {
  var jwtToken;
  var prereqArr = [];
  var id;

  //creates a user
  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({username:'test@example.com', password:'Foobar123'})
    .end(function(err, res) {
      jwtToken = res.body.jwt;
      done();
    });
  });

  //makes user a teacher
  before(function(done) {
    chai.request(localhost)
    .auth({username: 'admin', password: 'password'})
    .send({basic:{teacher:true}})
    .end(function(err, res) {
      console.log(res.body);
      done();
    });
  });

  it('should be able to create a class', function(done) {
    chai.request(localhost)
      .post('/api/classes')
      .set({jwt: jwtToken})
      .send({
        name: 'classname',
        summary: 'stuff',
        schedule: 'today',
        description: 'stuff',
        prereq: prereqArr,
        pass: false
      })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.equal(Object);
        expect(res.body.pass).to.eql(false);
        expect(res.body.prereq.length).to.eql(0);
        id = res.body.id;
        done();
      });
  });

  it('should be able to edit class info', function(done) {
    chai.request(localhost)
    .put('api/classes')
    .set({jwt: jwtToken})
    .send({description:'this is a class'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('class info updated');
      done();
    });
  });

  it('should be able to get a class', function(done) {
    chai.request(localhost)
    .get('api/classes')
    .set({jwt: jwtToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('name');
      done();
    });
  });

  it('should be able to delete a class', function(done) {
    chai.request(localhost)
    .delete('api/classes')
    .set({jwt: jwtToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('class removed');
      done();
    });
  });

});
