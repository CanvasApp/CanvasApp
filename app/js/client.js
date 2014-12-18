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
//routes

codeApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/signup', {
    templateUrl: 'templates/users/signup_template.html',
    controller: 'usersCtrl'
  })
  .when('/signin', {
    templateUrl: 'templates/users/signin_template.html'
  })
  .when('/userprofile', {
    templateUrl: 'templates/users/user_template.html',
    controller: 'userIndexCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
