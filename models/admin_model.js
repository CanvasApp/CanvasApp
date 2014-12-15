'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');

var expires = moment().add(7, 'days').valueOf();
console.log(expires);

var adminSchema = mongoose.Schema({
  basic: {
    email: String,
    password: String
  },
  teacher: {confirmed: true},
  admin: {confirmed: true},
  userclass: [],
  usermessages: [],
  userinfo: {
    name: String,
    phone: String
  }
});

adminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

adminSchema.methods.generateToken = function(secret) {
  var _this = this;
  var token = jwt.encode({
    iss: _this._id,
    exp: expires
  }, secret);
  return token;
};

module.exports = mongoose.model('Admin', userSchema);
