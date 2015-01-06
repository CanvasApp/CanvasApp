'use strict';

var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
  name: {type: String, required: true},
  summary: String,
  schedule: {type: String, required: true},
  description: String,
  code: String
});

module.exports = mongoose.model('Course', courseSchema);
