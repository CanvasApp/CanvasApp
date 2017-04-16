'use strict';

module.exports = function(app, jwtauth) {
  var User = require('../models/user_model');

  //confirm teacher
  app.post('/api/confirmteacher', jwtauth, function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) return res.status(500).send('error');
      console.log(user);
      user.teacher.confirmed = true;
      console.log(user.teacher);
      user.save(function(err) {
        if (err) return res.status(500).send('error');
        res.json({msg: 'confirmed user is teacher'});
      });
    });
  });

  //unconfirm teacher
  app.post('/api/unconfirmteacher', jwtauth, function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) return res.status(500).send('error');
      console.log(user);
      user.teacher.confirmed = false;
      console.log(user.teacher);
      user.save(function(err) {
        if (err) return res.status(500).send('error');
        res.json({msg: 'teacher has been removed from this plane of existance'});
      });
    });
  });
};
