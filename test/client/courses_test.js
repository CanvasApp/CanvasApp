'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('The course controller tests', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $cookies = {jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N…4NDV9.5dr6hQ2rJr9972-LuyxcL6xnVVRRwdbJ7CDNHKDgcrQ'};

  var course = {  name: 'Python 2',
                  summary: 'This is a great...',
                  schedule: 'Summer 2015',
                  description: 'This is a great course to take if you want to learn python.',
                  code: '4badd' };
  var courseChanged = { name: 'Python 2',
                        summary: 'I changed the d...',
                        schedule: 'Winter 2015',
                        description: 'I changed the description of the course.',
                        code: '4badd' };
                
  beforeEach(angular.mock.module('codeApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create the courses controller', function() {
    var courseController = $controllerConstructor('courseCtrl', {$scope: $scope, $cookies: $cookies});
    expect(typeof courseController).toBe('object');
  });

  describe('The course tests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $controllerConstructor('courseCtrl', {$scope: $scope, $cookies: $cookies});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create a course', function() {
      $httpBackend.expectPOST('/api/courseenrollment').respond(200, course);

      $scope.course = {
        name: 'Python 2',
        schedule: 'Summer 2015',
        description: 'This is a great course to take if you want to learn python.'
      };

      $scope.createCourse();
      $httpBackend.flush();

      expect($scope.course).toBeDefined();
      expect($scope.course.code).toEqual('4badd');
    });

    it('should get all of the courses', function() {
      $httpBackend.expectGET('/api/courses').respond(200, course);

      $scope.getCourses();
      $httpBackend.flush();

      expect($scope.courses).toBeDefined();
      expect($scope.courses.code).toEqual('4badd');
    });

    it('should get a course', function() {
      $scope.course = {code: '4badd'};
      $httpBackend.expectGET('/api/course/' + $scope.course.code).respond(200, course);

      $scope.getCourse();
      $httpBackend.flush();

      expect($scope.course).toBeDefined();
      expect($scope.course.code).toEqual('4badd');
    });

    it('should update a course', function() {
      $scope.course = {code: '4badd'};
      $httpBackend.expectPUT('/api/courses/' + $scope.course.code).respond(200, courseChanged);

      $scope.updateCourse();
      $httpBackend.flush();

      expect($scope.course).toBeDefined();
      expect($scope.course.description).toEqual('I changed the description of the course.');
    });

    it('should delete a course', function() {
      $scope.course = {code: '4badd'};
      $httpBackend.expectDELETE('/api/course/' + $scope.course.code).respond(200, { msg: 'course removed'});

      $scope.deleteCourse();
      $httpBackend.flush();

      expect($scope.msg.msg).toEqual('course removed');
    });

    it('should confirm a teacher', function() {
      $httpBackend.expectPUT('/api/confirmteacher').respond(200, )
    })

    it('should unconfirm a teacher', function() {

    })
  });
});
