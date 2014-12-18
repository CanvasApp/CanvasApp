'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('Users Index Controller', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $cookies = {jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N…4NDV9.5dr6hQ2rJr9972-LuyxcL6xnVVRRwdbJ7CDNHKDgcrQ'};

  beforeEach(angular.mock.module('codeApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var usersIndexController = $controllerConstructor('userIndexCtrl', {$scope: $scope});
    expect(typeof usersIndexController).toBe('object');
  });

  describe('users index tests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $controllerConstructor('userIndexCtrl', {$scope: $scope}, {$cookies: $cookies});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all users', function() {
      $httpBackend.expectGET('/api/allusers').respond(200);

      $scope.allUsers();
      $httpBackend.flush();

      expect($scope.basic.email).toEqual('test@example.com');
    });

    it('should get one users by jwt', function() {
      $httpBackend.expectGET('/api/user').respond(200);

      $scope.User();
      $httpBackend.flush();

      expect($scope.basic.email).toEqual('test@example.com');
    });

    it('should be able to change the user info', function() {
      $httpBackend.expectPUT('/api/user').respond(200);
      var user = {userinfo: {name: {first: 'test', last: 'example'}, phone: '5556667777'}};
      user.userinfo.name.first = 'joe';
      user.userinfo.name.last = 'test';
      user.userinfo.phone = '2342342344';
      
      $scope.changeUserInfo();
      $httpBackend.flush();

      expect($scope.user.userinfo.name.first).toBe('joe');
      expect($scope.user.userinfo.name.last).toBe('test');
      expect($scope.user.userinfo.phone).toBe('2342342344');
    });

    it('should be able to delete a user', function() {
      $httpBackend.expectDELETE('/api/user').respond(200);
      var user = {'basic' : { 'email' : 'test@example.com' }};
      $scope.users = [user];

      $scope.deleteUser(user);

      expect($scope.users.length).toBe(0);
    });
  });
});
