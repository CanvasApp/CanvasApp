'use strict';

module.exports = function(app, jwtauth) {
  var User = require('../models/user_model');
  var Course = require('../models/courses_model');
  var Enrollment = require('../models/enrollment_model');
  var UniqueId = require('../lib/uid');



  //add students to enrollment
  app.put('/api/studentenrollment/:code', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      console.log('user found');
        Enrollment.findOneAndUpdate({'enrollment.code': req.params.code}, {$push:{'enrollment.students':{email: req.user.basic.email}}}, 
          function(err, enrollment) {
        if (err) return res.status(500).send(err);
        if (!enrollment) return res.send({msg: 'class not found'});
        console.log('course found');
        res.json(enrollment);
      });
    });
  });

  
};
