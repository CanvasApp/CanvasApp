'use strict';

var Message = require('../models/message_model');
var User = require('../models/user_model');

module.exports = function(app, jwtauth) {

  //posts a message to the database
  app.post('/api/sendmessage', jwtauth, function(req, res) {
    var messages = new Message();
    messages.to = req.body.to;
    messages.message.from = req.body.message.from;
    messages.message.subject = req.body.message.subject;
    messages.message.main = req.body.message.main;
    messages.save(function(err, data) {
      if (err) return res.status(500).send('ok');
      res.json(data);
    });
  });


  app.get('/api/inbox/:to', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) res.status(500).send('error');
      if (!user) return res.send({msg:'you are not logged in'});
      Message.find({'to': req.params.to}, function(err, message) {
        if (err) res.status(500).send('error');
        if (!message) {res.send('No new Mail');} else {
          User.findOneAndUpdate({_id: req.user._id}, {$push:{usermessages: message}},
           function(err, data) {
            if (err) res.status(500);
            res.json(data);
            Message.find({'to': req.params.to}).remove().exec();
          });
        }
      });
    });
  });
};





//   app.put('/api/usermessage', jwtauth, function(req, res) {
//     User.findOne({_id: req.user._id}, function(err, user) {
//       if (err) return res.status(500).send('hmmmm');
//       console.log(user);
//       Message.findOne({'to': req.user.email}, function (err, message){
//         if (err) return res.status(500).send('kkkkk');
//         console.log(Message.message);
//         user.usermessages = Message.message;
//         user.save(function(err, data) {
//           if (err) return res.status(500).send('hmmmm');
//           res.json(data);
//           console.log(data);
//         });
//       });

//     });
//   });
// };
