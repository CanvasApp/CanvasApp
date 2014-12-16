'use strict';

var Message = require('../models/message_model');
var User = require('../models/user_model');


// module.exports = function(app, jwtauth) {

//   app.put('/api/usermessage', jwtauth, function(req, res) {
//     var messages = new Message();
//     messages.to = req.body.to;
//     messages.message.from = req.body.from;
//     messages.message.subject = req.body.subject;
//     messages.message.main = req.body.main;
//     console.log(messages.message.from);
//     User.findOne({'email': req.body.to}, messages, function(){
//       User.usermessages[0].from = messages.message.from;
//       User.usermessages[1].subject = messages.message.subject;
//       User.usermessages[2].main = messages.message.main;
//       User.save(function(err, data) {
//         if (err) return res.status(500).send('Message not sent');
//         res.json(data);
//       });
//     });
//   });
// };

app.post('/api/usermessage', jwtauth, function(req, res) {
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

app.put('/api/userbox', jwtauth, function(req, res) {
  User.findOne({'basic.email': req.body.email}, function(err, user) {
    if (err) return res.status(500).send('hmmmm');
    console.log(user);
    if(user) {
      Message.findOne({'to': req.body.email}, function (err, user){
        if (err) return res.status(500).send('kkkkk');
        console.log(Message);
        user.usermessages.from = Message.message.from;
        user.save(function(err, data) {
          if (err) return res.status(500).send('hmmmm');
          res.json(data);
          console.log(data);
        });
      });
    }
  });
});


