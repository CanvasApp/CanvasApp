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
};
