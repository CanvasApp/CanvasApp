'use strict';

var mongoose = require('mongoose');

var introSchema = mongoose.Schema({
  questions: []
});

introSchema.methods.Answers = function() {
  
};

module.exports = mongoose.model('Intro', introSchema);
