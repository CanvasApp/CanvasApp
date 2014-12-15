'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');

var expires = moment().add(7, 'days').valueOf();
console.log(expires);

var userSchema = mongoose.Schema({
  basic: {
    email: String,
    password: String
  },
  userStatus: {
    teacher: {confirmed: false},
    admin: {confirmed: false}
  },
  userclass: [],
  usermessages: [],
  userinfo: {
    name: {first:String, last:String},
    phone: String
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(secret) {
  var _this = this;
  var token = jwt.encode({
    iss: _this._id,
    exp: expires
  }, secret);
  return token;
};

module.exports = mongoose.model('User', userSchema);