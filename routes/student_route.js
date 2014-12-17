'use strict';

module.exports = function(app, jwtauth) {
  var User = require('../models/user_model');
  var Course = require('../models/courses_model');

  //student puts class in their array
  app.put('/api/studentcourse/:code', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) res.status(500).send('error');
      if (!user) res.send({msg: 'user not found'});
      Course.findOne({code: req.params.code}, function(err, course) {
        if (err) res.status(500).send('error');
        if (!course) res.send({msg: 'course not found'});
        User.findOneAndUpdate({_id: req.user._id}, {$push:{userclass: course}},
         function(err, data) {
          if (err) res.status(500).send('error');
          if (!data) res.send({msg: 'course not aquired'});
          res.json(data);
        });
      });
    });
  });

  //teacher gets a students courses
  app.get('/api/studentcourses/:email', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      if (user.userStatus.teacher === true) {
        User.findOne({'basic.email':req.params.email}, function(err, user) {
          if (err) return res.status(500).send('error');
          if (!user) return res.send({msg: 'user not found'});
          res.json(user.userclass);
        });
      }
    });
  });

  //teacher marks a students course pass as true
  app.put('/api/studentpasscourse/:email', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      if (user.userStatus.teacher === true) {
        User.findOne({'basic.email':req.params.email}, function(err, user) {
          if (err) return res.status(500).send('error');
          if (!user) return res.send({msg: 'user not found'});
          console.log(user.userclass);
          for(var i = 0; i < user.userclass.length; i++) {
            if(user.userclass[i].code === req.body.code){
              user.userclass[i].pass.confirmed = true;
            }
          }
          user.save(function(err, data) {
            if (err) return res.status(500).send('error');
            if (!data) return res.send({msg: 'data not saved'});
            res.json(data.userclass);
          });
        });
      }
    });
  });
};
