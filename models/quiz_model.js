'use strict';

var mongoose = require('mongoose');

var quizSchema = mongoose.Schema({
  question: String,
  answers: {
    javascript: String,
    python: String,
    ruby: String,
    objective: String
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
