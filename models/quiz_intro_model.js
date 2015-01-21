'use strict';

var mongoose = require('mongoose');

var introSchema = mongoose.Schema({
  quiz: {
    questions: []
  }
});

module.exports = mongoose.model('Intro', introSchema);
