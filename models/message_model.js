'use strict';

var mongoose = require('mongoose');

var messagesSchema = mongoose.Schema({
  to: String,
  from: String,
  subject: String,
  message: String
});

module.exports = mongoose.model('Message', messagesSchema );
