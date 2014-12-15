'use strict';

module.exports = function(app, jwtauth) {
  var User = require('../models/user_model');

  //confirm teacher
  app.put('/api/confirmteacher', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      if (user.userStatus.admin === true) {
        User.findOne({'basic.email': req.body.email}, function(err, user) {
          if (err) return res.status(500).send('error');
          if (!user) return res.send({msg: 'user not found'});
          console.log(user);
          user.userStatus.teacher = true;
          console.log(user.userStatus.teacher);
          user.save(function(err, data) {
            if (err) return res.status(500).send('error');
            if (!data) return res.send({msg: 'data not saved'});
            console.log(data);
            res.json({msg: 'user is now a teacher'});
          });
        });
      } else {
        res.json({msg: 'you do not have permission'});
      }
    });
  });

  //unconfirm teacher
  app.put('/api/unconfirmteacher', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'error'});
      if (user.userStatus.admin === true) {
        User.findOne({'basic.email': req.body.email}, function(err, user) {
          if (err) return res.status(500).send('error');
          if (!user) return res.send({msg: 'user not found'});
          user.userStatus.teacher = false;
          console.log(user.userStatus.teacher);
          user.save(function(err, data) {
            if (err) return res.status(500).send('error');
            if (!data) return res.send({msg: 'data not saved'});
            res.json({msg: 'teacher has been removed from this plane of existence'});
          });
        });
      } else {
        res.json({msg: 'you do not have permission'});
      }
    });
  });
};
