'use strict';

module.exports = function Counter() {
  var moment = require('moment');
  var timestr = moment().valueOf().toString().substr(8, 5);
  return timestr;
}
