'use strict';

module.exports = function(app, jwtauth) {
  var User = require('../models/user_model');
  var Course = require('../models/courses_model');
  var Enrollment = require('../models/enrollment_model');
  var UniqueId = require('../lib/uid');



  //add students to enrollment



  //teacher gets course enrollment
  app.get('/api/courseenrollment/:code', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      if (user.userStatus.teacher === true) {
        Enrollment.findOne({'enrollment.code':req.params.code}, function(err, enrollment) {
          if (err) return res.status(500).send('error');
          if (!user) return res.send({msg: 'user not found'});
          res.json(enrollment.students);
        });
      }
    });
  });
};
