'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('Users Controller', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $location;
  var $cookies = {jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N…4NDV9.5dr6hQ2rJr9972-LuyxcL6xnVVRRwdbJ7CDNHKDgcrQ'};

  beforeEach(angular.mock.module('codeApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var usersController = $controllerConstructor('usersCtrl', {$scope: $scope});
    expect(typeof usersController).toBe('object');
  });

  describe('users tests', function() {
  beforeEach(angular.mock.inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $controllerConstructor('usersCtrl', {$scope: $scope});
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should create a user', function() {
    $httpBackend.expectPOST('/api/users').respond(200, $cookies.jwt);

    $scope.newUser = {
      email: 'test@example.com',
      password: 'Foobar123',
      passwordConfirmation: 'Foobar123'
    };

    $scope.signUp();
    $httpBackend.flush();

    expect($scope.msg).toEqual('success!');
  });

  it('should get a user', function() {
    $httpBackend.expectGET('/api/user').respond(200, $cookies.jwt);

    $scope.user = {
      email: 'test@example.com',
      password: 'Foobar123'
    };

    $scope.signIn();
    $httpBackend.flush();

    expect($scope.msg).toEqual('success!');
  });
});

});

