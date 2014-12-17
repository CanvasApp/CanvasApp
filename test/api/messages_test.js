'use strict';

process.env.MONGO_URL = 'mongodb://localhost/messages_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var User = require('../../models/user_model.js');
var Message = require('../../models/message_model.js');
chai.use(chaihttp);

require('../../server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

User.collection.remove(function(err) {
  if (err) throw (err);
});

Message.collection.remove(function(err) {
  if (err) throw (err);
});

describe('messages: ', function() {
  var oneTk;
  var twoTk;
  var threeTk;
  var fourTk;
  var fiveTk;
  var sixTk;
  var sevenTk;
  var eightTk;


  //creates users
  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'r1@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) return res.status(500).send('create1');
      oneTk = res.body.jwt;
      console.log(oneTk);
      done();
    });
  });

  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'r2@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) return res.status(500).send('create2');
      twoTk = res.body.jwt;
      console.log(twoTk);
      done();
    });
  });

  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'s3@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) return res.status(500).send('create3');
      threeTk = res.body.jwt;
      console.log(threeTk);
      done();
    });
  });

  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'s4@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) return res.status(500).send('create4');
      fourTk = res.body.jwt;
      console.log(fourTk);
      done();
    });
  });

  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'s5@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) return res.status(500).send('create5');
      fiveTk = res.body.jwt;
      console.log(fiveTk);
      done();
    });
  });

  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'s6@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) return res.status(500).send('create6');
      sixTk = res.body.jwt;
      console.log(sixTk);
      done();
    });
  });

  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'s7@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) return res.status(500).send('create7');
      sevenTk = res.body.jwt;
      console.log(sevenTk);
      done();
    });
  });

  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({email:'s8@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) return res.status(500).send('create8');
      eightTk = res.body.jwt;
      console.log(eightTk);
      done();
    });
  });

  it('should send an email', function(done) {
    chai.request(localhost)
    .post('/api/sendmessage')
    .set({jwt: oneTk})
    .send({
      to: 'r1@example.com',
      message: {
        from: 's3@example.com',
        subject: 'three is the number',
        main: 'I am the master'
      }
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      console.log(res.body.message.subject);
      expect(res.body.message.subject).to.equal('three is the number');
      done();
    });
  });

  before( function(done) {
    chai.request(localhost)
    .post('/api/sendmessage')
    .set({jwt: fourTk})
    .send({
      to: 'r1@example.com',
      message: {
        from: 's4@example.com',
        subject: 'four is the number',
        main: 'I am the master'
      }
    })
    .end(function(err, res) {
      if (err) return res.send(res.body);
      done();
    });
  });

  before( function(done) {
    chai.request(localhost)
    .post('/api/sendmessage')
    .set({jwt: fiveTk})
    .send({
      to: 'r1@example.com',
      message: {
        from: 's5@example.com',
        subject: 'five is the number',
        main: 'I am the master'
      }
    })
    .end(function(err, res) {
      if (err) return res.send(res.body);
      done();
    });
  });

  before( function(done) {
    chai.request(localhost)
    .post('/api/sendmessage')
    .set({jwt: sixTk})
    .send({
      to: 'r1@example.com',
      message: {
        from: 's6@example.com',
        subject: 'six is the number',
        main: 'I am the master'
      }
    })
    .end(function(err, res) {
      if (err) return res.send(res.body);
      done();
    });
  });

  before( function(done) {
    chai.request(localhost)
    .post('/api/sendmessage')
    .set({jwt: sevenTk})
    .send({
      to: 'r2@example.com',
      message: {
        from: 's7@example.com',
        subject: 'seven is the number',
        main: 'I am the master'
      }
    })
    .end(function(err, res) {
      if (err) return res.send(res.body);
      done();
    });
  });

  before( function(done) {
    chai.request(localhost)
    .post('/api/sendmessage')
    .set({jwt: eightTk})
    .send({
      to: 'r5@example.com',
      message: {
        from: 's8@example.com',
        subject: 'eight is the number',
        main: 'I am the master'
      }
    })
    .end(function(err, res) {
      if (err) return res.send(res.body);
      done();
    });
  });

  it('should retrieve correct emails', function(done) {
    chai.request(localhost)
    .get('/api/inbox/r1@example.com')
    .set({jwt: oneTk})
    .end(function(err, res) {
      expect(err).to.equal(null);
      console.log(res.body.usermessages[0][0].message.subject);
      expect(res.body.usermessages).to.have.deep.property('[0][0].message.subject', 'four is the number');
      done();
    });
  });
});
