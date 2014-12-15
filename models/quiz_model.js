'use strict';

var mongoose = require('mongoose');

var quizSchema = mongoose.Schema({
  quizQuestion: {
    question: {type: String, required: true},
    questionValue: {
      javascript: {type: Boolean, value: 1 },
      python: {type: Boolean, value: 2},
      ruby: {type: Boolean, value: 3},
      objectiveC: {type: Boolean, value: 4}
    }
  },
  answerArray: []
});

module.exports = mongoose.model('Quiz', quizSchema);
