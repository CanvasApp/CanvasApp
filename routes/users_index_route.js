'use strict';

module.exports = function(app, jwtauth) {
  var User = require('../models/user_model.js');

  //get everyone
  app.get('/api/allusers', jwtauth, function(req, res) {
    User.find(function(err, data) {
      console.log('getting all of the users');
      if (err) return res.status(500).send('error');
      res.json(data);
    });
  });

  //get one person by jwt
  app.get('/api/user', jwtauth, function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) return res.status(500).send('error');
      console.log(user);
      res.json(user);
    });
  });

  //add and change information
  app.put('/api/userinfo', jwtauth, function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) return res.status(500).send('error');
      console.log(user);
      user.userinfo = {name: req.body.userinfo.name, phone: req.body.userinfo.phone};
      console.log(user.userinfo);
      user.save(function(err) {
        if (err) return res.status(500).send('error');
        res.json({msg:'user updated'});
      });
    });
  });

  //delete information
  app.delete('/api/user', jwtauth, function(req, res) {
    User.remove({_id: req.body.user_id}, function(err) {
      if (err) return res.status(500).send('error');
      res.json({msg: 'user removed'});
    });
  });
};
