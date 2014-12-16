'use strict';
var uuid = require('node-uuid');

var UniqueId = function() {
  return uuid.v1().toString().substr(0,5);
};

module.exports = UniqueId;
