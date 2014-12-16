'use strict';

var mongoose = require('mongoose');

var messagesSchema = mongoose.Schema({
  to: String,
  message: {
    from: String,
    subject: String,
    main: String
  }
});

module.exports = mongoose.model('Message', messagesSchema );
