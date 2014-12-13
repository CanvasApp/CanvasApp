'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var passport = require('passport');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/canvas_dev');
app.use(bodyparser.json());

app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');

app.use(passport.initialize());

require('./lib/passport')(passport);
var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));

var canvasRouter = express.Router();
canvasRouter.use(jwtauth);

require('./routes/index.js')(app);
require('./routes/users_routes.js')(app, passport);
require('./routes/confirmed_user_route.js')(app, passport);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: ' + app.get('port'));
});
