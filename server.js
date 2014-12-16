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

app.use(express.static(__dirname + '/build'));

require('./lib/passport')(passport);
var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));

var canvasRouter = express.Router();
canvasRouter.use(jwtauth);

require('./routes/index.js')(app);
require('./routes/users_routes.js')(app, passport, canvasRouter);
require('./routes/users_index_route.js')(app, jwtauth);
require('./routes/teachers_route.js')(app, jwtauth);
require('./routes/quiz_route.js')(app, jwtauth);
require('./routes/courses_route.js')(app, jwtauth);
require('./routes/admin_routes.js')(app, jwtauth);
require('./routes/messages_route.js')(app, jwtauth);
require('./routes/student_route.js')(app,jwtauth);


app.get('*', function(req, res) {
  res.sendfile('./build/index.html');
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: ' + app.get('port'));
});
