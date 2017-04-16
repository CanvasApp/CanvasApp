'use strict';

var mongoose = require('mongoose');

var quizSchema = mongoose.Schema({
  question: '',
  answers: {
    javascript: '',
    python: '',
    ruby: '',
    objective: Boolean
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
