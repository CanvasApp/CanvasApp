'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('the quiz controller test', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $cookies = {jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N…4NDV9.5dr6hQ2rJr9972-LuyxcL6xnVVRRwdbJ7CDNHKDgcrQ'};
  var quiz = {code: '9be23',
              answerArray: [],
              quizQuestion: 
               { question: 'What is a karma test?',
                 questionValue: { javascript: true, python: true, ruby: true, objectiveC: true }}
               };

  beforeEach(angular.mock.module('codeApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create the quiz controller', function() {
    var quizController = $controllerConstructor('quizCtrl', {$scope: $scope, $cookies: $cookies});
    expect(typeof quizController).toBe('object');
  });

  describe('the quiz test', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $controllerConstructor('quizCtrl', {$scope: $scope, $cookies: $cookies});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create a quiz question', function(){
      $httpBackend.expectPOST('/api/quiz').respond(200, quiz);

      $scope.quiz = {
        quizQuestion: {
          question: 'What is a karma test?',
          questionValue: {
            javascript: true, python: false, ruby: false, objectiveC: false
          }
        }
      }

      $scope.createQuestion();
      $httpBackend.flush();

      expect($scope.quiz).toBeDefined();
    });
  });
});
