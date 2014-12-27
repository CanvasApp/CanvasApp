'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('The admin and teacher controllers', function() {
  var $controllerConstructor;
  //var $httpBackend;
  var $scope;
  var $cookies = {jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N…4NDV9.5dr6hQ2rJr9972-LuyxcL6xnVVRRwdbJ7CDNHKDgcrQ'};

  beforeEach(angular.mock.module('codeApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create the admin controller', function() {
    var adminController = $controllerConstructor('adminCtrl', {$scope: $scope, $cookies: $cookies});
    expect(typeof adminController).toBe('object');
  });

  it('should be able to create the teacher controller', function() {
    var teacherController = $controllerConstructor('teacherCtrl', {$scope: $scope, $cookies: $cookies});
    expect(typeof teacherController).toBe('object');
  });
});
