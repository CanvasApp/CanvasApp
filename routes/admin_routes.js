'use strict';

module.exports = function(app, jwtauth) {
  var User = require('../models/user_model');

  app.post('/api/confirmadmin', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) res.status(500).send('error');
      if (!user) res.send({msg: 'user not found'});
      user.userStatus.teacher = true;
      user.userStatus.admin = true;
      user.save(function(err, data) {
        if (err) res.status(500).send('error');
        if (!data) res.send({msg: 'user not saved'});
        console.log(data);
        res.json({msg: 'user is now an admin'});
      });
    });
  });
};
