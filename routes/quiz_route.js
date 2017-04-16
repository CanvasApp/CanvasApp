'use strict';

var Quiz = require('../models/quiz_model');

module.exports = function(app, jwtauth) {
  app.post('/api/quiz', jwtauth, function(req, res) {
    var quiz = new Quiz({
      question: req.body,
      answers: {
        javascript: req.body.javascript,
        python: req.body.python,
        ruby: req.body.ruby,
        objective: true
      }
    });
    quiz.save(function(err, data) {
      if (err) return res.status(500).send('There was an error');
      console.log(data);
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
