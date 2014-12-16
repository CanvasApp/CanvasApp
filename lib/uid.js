'use strict';

module.exports = function UniqueId() {
  var uuid = require('node-uuid');
  var id = uuid.v1().toString().substr(0,5);
  return id;
}

