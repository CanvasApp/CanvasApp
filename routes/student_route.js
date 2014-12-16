'use strict';

module.exports = function(app, jwtauth) {
  var User = require('../models/user_model');

  app.put('/api/studentcourse', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) res.status(500).send('error');
      if (!user) res.send({msg: 'user not found'});
      res.json(user);
    });
  });
};
