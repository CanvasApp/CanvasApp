'use strict';

process.env.MONGO_URL = 'mongodb://localhost/courses_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var Courses = require('../../models/courses_model');
var User = require('../../models/user_model.js');
chai.use(chaihttp);

require('../../server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

User.collection.remove(function(err) {
  if (err) throw(err);
});

Courses.collection.remove(function(err) {
  if (err) throw(err);
});

describe('the courses test', function() {
  var jwtToken;
  var regcode;

  //creates a user
  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'test@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) return res.status(500).send('error');
      jwtToken = res.body.jwt;
      done();
    });
  });

  //makes user an admin
  before(function(done) {
    chai.request(localhost)
    .put('/api/confirmadmin')
    .set({jwt: jwtToken})
    .end(function(err, res) {
      if (err) return res.status(500).send('error');
      done();
    });
  });

  it('should be able to create a course', function(done) {
    chai.request(localhost)
      .post('/api/courseenrollment')
      .set({jwt: jwtToken})
      .send({
        name: 'Foundations 1',
        schedule: 'Winter 2015',
        description: 'the first class you take'
      })
      .end(function(err, res) {
        regcode = res.body.code;
        console.log(regcode);
        expect(err).to.eql(null);
        expect(res.body.msg).to.equal('course created');
        done();
      });
  });

  it('should be able to edit course info', function(done) {
    chai.request(localhost)
    .put('/api/courses/' + regcode)
    .set({jwt: jwtToken})
    .send({
      name: 'Javascript Foundations 2',
      schedule: 'Fall 2015',
      description: 'the step before the dev accelator',
      code: regcode
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('course updated');
      done();
    });
  });

  it('should be able to get a course', function(done) {
    chai.request(localhost)
    .get('/api/course/' + regcode)
    .set({jwt: jwtToken})
    //.send({code: regcode})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('name');
      done();
    });
  });

  it('should be able to delete a course', function(done) {
    chai.request(localhost)
    .delete('/api/course')
    .set({jwt: jwtToken})
    .send({code: regcode})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('course removed');
      done();
    });
  });

});
