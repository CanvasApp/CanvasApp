'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('The message controller test', function() {
  var $controllerContstructor;
  var $httpBackend;
  var $scope;
  var data;
  //var $http;
  var $cookies = {jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N…4NDV9.5dr6hQ2rJr9972-LuyxcL6xnVVRRwdbJ7CDNHKDgcrQ'};
  var testmessage = {
    to: 'test@example.com',
    message: {
      from: 'test1@example.com',
      subject: 'This is a test',
      main: 'This is a karma front end test'
    }
  };

  var personInfo = { userinfo: 
                       { phone: '847-777-7777',
                         name: { first: 'test', last: 'user' } },
                      usermessages: [testmessage],
                      userStatus: { admin: true, teacher: true },
                      basic: 
                       { password: 'Foobar123',
                         email: 'test@example.com' } };

  beforeEach(angular.mock.module('codeApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerContstructor = $controller;
  }));

  it('should be able to create the message controller', function() {
    var messageController = $controllerContstructor('messagesCtrl', {$scope: $scope, $cookies: $cookies});
    expect(typeof messageController).toBe('object');
  });

  describe('the messages test', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $controllerContstructor('messagesCtrl', {$scope: $scope, $cookies: $cookies});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to send a message', function() {
      $httpBackend.expectPOST('/api/sendmessage').respond(200, testmessage);

      $scope.newMessage = {
        to: 'test@example.com',
          message: {
            from: 'test1@example.com',
            subject: 'This is a test',
            main: 'This is a karma front end test'
          }
        };

        $scope.send();
        $httpBackend.flush();

        expect($scope.messagedata).toBeDefined();
        expect($scope.messagedata.message.main).toEqual('This is a karma front end test');
    });

    it('should be able to get a message', function() {
      data = {data: personInfo};
      //var url = '/api/inbox/' + data.data.basic.email;
      console.log(data.data.basic.email + '<-----email!');
      $httpBackend.expectGET('/api/user').respond(200, data);      
      $httpBackend.expectGET('/api/inbox/' + data.data.basic.email).respond(200, testmessage);

      $scope.getMail();
      $httpBackend.flush();

      expect($scope.usermessages).toBeDefined();
    });
  });
});
