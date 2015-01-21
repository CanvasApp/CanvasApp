'use strict';

var mongoose = require('mongoose');

var quizSchema = mongoose.Schema({
  quizQuestion: {
    question: {type: String, required: true},
    questionValue: {
      javascript: {type: Boolean, default:false},
      python: {type: Boolean, default:false},
      ruby: {type: Boolean, default:false},
      objectiveC: {type: Boolean, default:false}
    }
  },
  code: String
});

module.exports = mongoose.model('Quiz', quizSchema);
