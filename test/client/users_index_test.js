'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('Users Index Controller', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $cookies = {jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N…4NDV9.5dr6hQ2rJr9972-LuyxcL6xnVVRRwdbJ7CDNHKDgcrQ'};
  var personInfo = { userinfo: 
                       { phone: '847-777-7777',
                         name: { first: 'test', last: 'user' } },
                      usermessages: [],
                      userStatus: { admin: true, teacher: true },
                      basic: 
                       { password: 'Foobar123',
                         email: 'test@example.com' } };

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
      $controllerConstructor('userIndexCtrl', {$scope: $scope, $cookies: $cookies});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all users', function() {
      $httpBackend.expectGET('/api/allusers').respond(200, personInfo);

      $scope.allUsers();
      $httpBackend.flush();

      expect(personInfo.userinfo.name.first).toEqual('test');
      expect($scope.msg).toEqual('success!');
    });

    it('should get one user by jwt', function() {
      $httpBackend.expectGET('/api/user').respond(200, personInfo);

      $scope.User();
      $httpBackend.flush();

      expect($scope.msg).toEqual('success!');
    });

    it('should be able to change the user info', function() {
      $httpBackend.expectPUT('/api/user').respond(200, personInfo);

      $scope.user = {
          basic: {
            email: 'test@example.com'
          },
          userinfo: {
            name: {
              first: 'test',
              last: 'example'
            },
            phone: '454-473-7474'
          }
        };

      console.log($scope.user);
      
      $scope.changeUserInfo();
      $httpBackend.flush();

      expect($scope.msg).toEqual('success!');
    });

    it('should be able to delete a user', function() {
      $httpBackend.expectDELETE('/api/user').respond(200, 'user was deleted');

      $scope.deleteuser = {
        email: 'test@example.com',
        emailConfirmation: 'test@example.com'
      };

      $scope.deleteUser();
      $httpBackend.flush();
      
      expect($scope.msg).toEqual('success!');
    });
  });
});
