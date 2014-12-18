'use strict';

module.exports = function(app, jwtauth) {
  var User = require('../models/user_model');

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
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      console.log(user);
      res.json(user);
    });
  });

  //add and change information
  app.put('/api/user', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user error'});
      console.log(user);
      user.basic.email = req.body.email;
      user.userinfo.name.first = req.body.first;
      user.userinfo.name.last = req.body.last;
      user.userinfo.phone = req.body.phone;
      if (!req.body.email) return res.send({msg: user.basic.email});
      user.save(function(err, data) {
        if (err) return res.status(500).send('error');
        if (!data) return res.send({msg: 'did not save'});
        console.log(data);
        res.json({msg: 'user updated', email: user.basic.email, 
          name: user.userinfo.name.first});
      });
    });
  });

  //delete information
  app.delete('/api/user', jwtauth, function(req, res) {
    User.remove({_id: req.user._id}, function(err, data) {
      if (err) return res.status(500).send('error');
      if (!data) return res.send({msg: 'user not deleted'});
      res.json({msg: 'user has been sent to the phantom zone'});
    });
  });
};
