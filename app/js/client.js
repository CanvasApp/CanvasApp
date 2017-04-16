'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var codeApp = angular.module('codeApp', ['ngRoute', 'ngCookies', 'base64']);

//directives

//services

//controllers
require('./users/controllers/users_controller')(codeApp);
require('./users/controllers/user_index_controller')(codeApp);
require('./messages/controllers/messages_controller')(codeApp);
require('./teachers/controllers/admin_controller')(codeApp);
require('./courses/controllers/courses_controller')(codeApp);
require('./quiz/controllers/quiz_controller')(codeApp);
//routes

codeApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/signup', {
    templateUrl: 'templates/users/signup_template.html',
    controller: 'usersCtrl'
  })
  .when('/signin', {
    templateUrl: 'templates/users/signin_template.html',
    controller: 'usersCtrl'
  })
  .when('/userprofile', {
    templateUrl: 'templates/users/user_template.html',
    controller: 'userIndexCtrl'
  })
  .when('/inbox', {
    templateUrl: 'templates/messages/inbox_template.html',
    controller: 'messagesCtrl'
  })
  .when('/new', {
    templateUrl: 'templates/messages/new_template.html',
    controller: 'messagesCtrl'
  })
  .when('/message', {
    templateUrl: 'templates/messages/message_template.html',
    controller: 'messagesCtrl'
  })
  .when('/courses', {
    templateUrl: 'templates/course/course_template.html',
    controller: 'courseCtrl'
  })
  .when('/quiz', {
    templateUrl: 'templates/quiz/loadpage_template.html',
    controller: 'quizCtrl'
  })
  .when('/admin', {
    templateUrl: 'templates/admin/admin_template.html',
    controller: 'adminCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
