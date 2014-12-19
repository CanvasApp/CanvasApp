'use strict';

module.exports = function(app, jwtauth) {
  var User = require('../models/user_model');
  var Enrollment = require('../models/enrollment_model');

  //add students to enrollment
  app.put('/api/studentenrollment/:code', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      console.log('user found');
        Enrollment.findOneAndUpdate({'enrollment.code': req.params.code}, {$addToSet:{'enrollment.students':{email: req.user.basic.email, pass:false}}},
          function(err, enrollment) {
        if (err) return res.status(500).send('error');
        if (!enrollment) return res.send({msg: 'class not found'});
        console.log('course found');
        res.json(enrollment);
        });
    });
  });

  //add teacher to enrollment
  app.put('/api/teacherenrollment/:code', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      if (user.userStatus.teacher === true) {
        Enrollment.findOneAndUpdate({'enrollment.code': req.params.code}, {$addToSet:{'enrollment.teachers':{email: req.user.basic.email}}},
        function(err, enrollment) {
          if (err) return res.status(500).send('error');
          if (!enrollment) return res.send({msg: 'teacher not enrolled in class'});
          res.json(enrollment);
        });
      } else {
        res.json({msg: 'if you could teach the class then you wouldnt need to take it'});
      }
    });
  });

  //mark a student pass as true
  app.put('/api/studentenrollmentpass/:code', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      console.log(user.userStatus.teacher);
      if (user.userStatus.teacher === true) {
        Enrollment.findOne({'enrollment.code': req.params.code}, function(err, enrollment) {
          if (err) return res.status(500).send('error');
          if (!enrollment) return res.send({msg: 'enrollment not found'});
          for (var i = 0; i < enrollment.enrollment.students.length; i++) {
            if (enrollment.enrollment.students[i].email === req.body.email) {
              console.log(enrollment.enrollment.students[i]);
              enrollment.enrollment.students[i].pass = true;
            }
          }
          enrollment.markModified('enrollment.students');
          enrollment.save(function(err, data) {
            if (err) return res.status(500).send('error');
            if (!data) return res.send({msg: 'enrollment not saved'});
            res.json(data);
          });
        });
      } else {
        res.json({msg: 'students can not pass themselves.'});
      }
    });
  });
};
