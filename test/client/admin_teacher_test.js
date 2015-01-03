'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('The admin and teacher controllers', function() {
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

  var enroll = { enrollment:
                { code: 'dcabb',
                  coursename: 'Javascript Dev 1', 
                  students: [{email: 'test@example.com', pass: false}], 
                  teachers: [{email: 'test1@example.com'}] }};

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

  describe('the admin tests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $controllerConstructor('adminCtrl', {$scope: $scope, $cookies: $cookies});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a user into an admin', function() {
      $httpBackend.expectPUT('/api/confirmadmin').respond(200, personInfo);

      $scope.confirmAdmin();
      $httpBackend.flush();

      expect($scope.user).toBeDefined();
      expect($scope.user.userStatus.admin).toEqual(true);
    });

    it('should enroll a teacher in  to a class', function() {
      $scope.course = {code: 'dcabb'};
      $httpBackend.expectPUT('/api/teacherenrollment/' + $scope.course.code).respond(200, enroll);

      $scope.addTeacher();
      $httpBackend.flush();

      expect($scope.enrollments).toBeDefined();
      expect($scope.enrollments.enrollment.teachers[0].email).toEqual('test1@example.com');
    });
  });
});
