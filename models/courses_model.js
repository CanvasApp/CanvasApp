'use strict';

var mongoose = require('mongoose');

//http://stackoverflow.com/questions/19762430/make-all-fields-required-in-mongoose

var courseSchema = mongoose.Schema({
  name: {type: String, required: true},
  summary: String,
  schedule: {type: String, required: true},
  description: String,
  code: Number,
  prereq: [],
  pass: {confirmed: false}
});

module.exports = mongoose.model('Course', courseSchema);
