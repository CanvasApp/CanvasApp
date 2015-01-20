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
  code: String,
  answerArray: []
});

// quizSchema.methods.Answer = function() {
//   return answerArray.push(quizSchema.quizQuestion.questionValue);
// };

// quizSchema.methods.AnswerTally = function() {
//   for()
// };

module.exports = mongoose.model('Quiz', quizSchema);
