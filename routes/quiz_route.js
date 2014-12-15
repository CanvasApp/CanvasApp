'use strict';

module.exports = function(app, jwtauth) {
  var Quiz = require('../models/quiz_model');
  var Counter = require('../lib/counter');

  //create a quiz question
  app.post('/api/quiz', jwtauth, function(req, res) {
    var quiz = new Quiz({  
      quizQuestion: {
        question: req.body.quizQuestion.question,
        questionValue: {
          javascript: req.body.quizQuestion.questionValue.javascript,
          python: req.body.quizQuestion.questionValue.python,
          ruby: req.body.quizQuestion.questionValue.ruby,
          objectiveC: req.body.quizQuestion.questionValue.objectiveC
        }
      },
      code: Counter(),
      answerArray: []
    });
    quiz.save(function(err, data) {
      if (err) return res.status(500).send('error');
      if (!data) return res.send({msg: 'quiz question not saved'});
      console.log(data);
      res.json(data);
    });
  });

  //get all of the quiz questions
  app.get('/api/quizzes', jwtauth, function(req, res) {
    Quiz.find(function(err, data) {
      if (err) return res.status(500).send('error');
      if (!data) return res.send({msg: 'Could not get quiz questions'});
      res.json(data);
    });
  });

  // app.get('/api/quiz', jwtauth, function(req, res) {
  //   Quiz.findOne({})
  // })

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
