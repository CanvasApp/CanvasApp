'use strict';

var Quiz = require('../models/quiz_model');

module.exports = function(app, jwtauth) {
  app.post('/api/quiz', jwtauth, function(req, res) {
    var question = new Quiz();
    question.question = req.body.question;
    question.answers.javascript = req.body.answerOne;
    question.answers.python = req.body.answerTwo;
    question.answers.ruby = req.body.answerThree;
    question.answers.objective = req.body.answerFour;
    question.save(function(err, data) {
      if (err) return res.status(500).send('There was an error');
      res.json(data);
    });
  });

  app.get('api/quiz/:id', jwtauth, function(req, res) {
    Quiz.findOne({_id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('Unable to retrieve');
      res.json(data);
    });
  });

  app.put('api/quiz/:id', jwtauth, function(req, res) {
    var question = req.body;
    delete question._id;
    Quiz.findOneAndUpdate({_id: req.params.id}, question, function(err, data) {
      if (err) return res.status(500).send('Unable to edit');
      res.json(data);
    });
  });

  app.delete('api/quiz', jwtauth, function(req, res) {
    Quiz.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send('Unable to delete');
      res.json({msg: 'The ether has enveloped the question and it is lost to humanity'});
    });
  });
};
