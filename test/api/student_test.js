'use strict';

process.env.MONGO_URL = 'mongodb://localhost/users_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var User = require('../../models/user_model.js');
var Courses = require('../../models/courses_model');
chai.use(chaihttp);
chai.use(require('chai-things'));
chai.should();

require('../../server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

User.collection.remove(function(err) {
  if (err) throw(err);
});

Courses.collection.remove(function(err) {
  if (err) throw(err);
});

describe('the course adding test', function() {
  var AdminJwtToken;
  var StudentJwtToken;
  var regcode;

  //creates a user
  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'test2@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) return res.status(500).send('error');
      AdminJwtToken = res.body.jwt;
      console.log(AdminJwtToken);
      done();
    });
  });

  //makes user an admin
  before(function(done) {
    chai.request(localhost)
    .put('/api/confirmadmin')
    .set({jwt: AdminJwtToken})
    .end(function(err, res) {
      if (err) return res.status(500).send('error');
      console.log(res.body);
      done();
    });
  });

  //creates a course
  before(function(done) {
    chai.request(localhost)
      .post('/api/courseenrollment')
      .set({jwt: AdminJwtToken})
      .send({
        name: 'Foundations 1',
        schedule: 'Winter 2015',
        description: 'the first class you take'
      })
      .end(function(err, res) {
        if (err) return res.status(500).send('error');
        regcode = res.body.code;
        console.log(regcode);
        done();
      });
  });

  //creates a user who is just a student
  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'test3@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) return res.status(500).send('error');
      StudentJwtToken = res.body.jwt;
      console.log(StudentJwtToken);
      done();
    });
  });

  it('should add a student to enrollment', function(done) {
    chai.request(localhost)
      .put('/api/studentenrollment/' + regcode)
      .set({jwt:StudentJwtToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.enrollment.students).to.have.deep.property('[0].email', 'test3@example.com');
        done();
      });
  });

  it('should add a teacher to enrollment', function(done) {
    chai.request(localhost)
      .put('/api/teacherenrollment/' + regcode)
      .set({jwt: AdminJwtToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.enrollment.teachers).to.have.deep.property('[0].email', 'test2@example.com');
        done();
      });
  });

  it('should mark a student pass as true', function(done) {
    chai.request(localhost)
      .put('/api/studentenrollmentpass/' + regcode)
      .set({jwt: AdminJwtToken})
      .send({email: 'test3@example.com'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.enrollment.students).to.have.deep.property('[0].pass',true);
        done();
      });
  });
});
