'use strict';

module.exports = function(app, jwtauth) {
  var Quiz = require('../models/quiz_model');
  var User = require('../models/user_model');
  var UniqueId = require('../lib/uid');

  //creates a quiz question
  app.post('/api/quiz', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      if (user.userStatus.teacher === true) {
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
          code: UniqueId(),
          answerArray: []
        });
        quiz.save(function(err, data) {
          if (err) return res.status(500).send('error');
          if (!data) return res.send({msg: 'quiz question not saved'});
          console.log(data);
          res.json(data);
        });
      } else {
        res.json({msg: 'you do not have permission'});
      }
    });
  });

  //find all of the quiz questions
  app.get('/api/quizzes', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      if (user.userStatus.teacher === true) {
        Quiz.find(function(err, data) {
          if (err) return res.status(500).send('error');
          if (!data) return res.send({msg: 'Could not get quiz questions'});
          res.json(data);
        });
      } else {
        res.json({msg: 'you do not have permission'});
      }
    });
  });

  //find one quiz question by its code
  app.get('/api/quiz/:code', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      if (user.userStatus.teacher === true) {
        Quiz.findOne({code: req.params.code}, function(err, data) {
          if (err) return res.status(500).send('error');
          if (!data) return res.send({msg: 'could not find quiz question'});
          res.json(data);
        });
      } else {
        res.json({msg: 'you do not have permission'});
      }
    });
  });

  //find one quiz question by its code and allows the user to change info
  app.put('/api/quiz/:code', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      if (user.userStatus.teacher === true) {
        Quiz.findOne({code: req.params.code}, function(err, quiz) {
          if (err) return res.status(500).send('error');
          if (!quiz) return res.send({msg: 'could not find quiz question'});
          console.log(quiz);
          quiz.quizQuestion.question = req.body.quizQuestion.question;
          quiz.quizQuestion.questionValue.javascript = req.body.quizQuestion.questionValue.javascript;
          quiz.quizQuestion.questionValue.python = req.body.quizQuestion.questionValue.python;
          quiz.quizQuestion.questionValue.ruby = req.body.quizQuestion.questionValue.ruby;
          quiz.quizQuestion.questionValue.objectiveC = req.body.quizQuestion.questionValue.objectiveC;
          console.log(quiz);
          quiz.save(function(err, data) {
            if (err) res.status(500).send('error');
            if (!data) res.send({msg: 'could not save quiz question'});
            res.json(data);
          });
        });
      } else {
        res.json({msg: 'you do not have permission'});
      }
    });
  });

  //finds one quiz question by its code and deletes it
  app.delete('/api/quiz/:code', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.send({msg: 'user not found'});
      if (user.userStatus.teacher === true) {
        Quiz.remove({code: req.params.code}, function(err) {
          if (err) return res.status(500).send('Unable to delete');
          res.json({msg: 'The ether has enveloped the question and it is lost to humanity'});
        });
      } else {
        res.json({msg: 'you do not have permission'});
      }
    });
  });
};
