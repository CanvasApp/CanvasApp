'use strict';

var mongoose = require('mongoose');

var enrollmentSchema = mongoose.Schema({
  enrollment:{
    code: String,
    coursename: String,
    students:[],
    teachers:[]
  }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
