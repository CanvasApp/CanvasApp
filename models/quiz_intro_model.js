'use strict';

var mongoose = require('mongoose');

var introSchema = mongoose.Schema({
  quiz: {
    questions: [],
    answers: []
  }
});

module.exports = mongoose.model('Intro', introSchema);
