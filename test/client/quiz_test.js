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
      };

      $scope.createQuestion();
      $httpBackend.flush();

      expect($scope.quiz).toBeDefined();
      expect($scope.quiz.quizQuestion.question).toEqual('What is a karma test?');
    });

    it('should get all of the quiz questions', function() {
      $httpBackend.expectGET('/api/quizzes').respond(200, quiz);

      $scope.getQuestions();
      $httpBackend.flush();

      expect($scope.quizquestions).toBeDefined();
      expect($scope.quizquestions.quizQuestion.question).toEqual('What is a karma test?');
    });

    it('should get one of the quiz questions', function() {
      $scope.quizquestion = {code: '9be23'};
      $httpBackend.expectGET('/api/quiz/' + $scope.quizquestion.code).respond(200, quiz);

      $scope.getOneQuestion();
      $httpBackend.flush();

      expect($scope.quizquestion).toBeDefined();
      expect($scope.quizquestion.quizQuestion.question).toEqual('What is a karma test?');
    });

    it('should update a quiz question', function() {
      $scope.quizquestion = {code: '9be23'};
      $httpBackend.expectPUT('/api/quiz/' + $scope.quizquestion.code).respond(200, {msg: 'quiz question updated'});

      $scope.quiz = {
        quizQuestion: {
          question: 'What is a front end test?',
          questionValue: {javascript: true, python: true, ruby: true, objectiveC: true}
        }
      };

      $scope.changeQuestion();
      $httpBackend.flush();

      expect($scope.msg).toBeDefined();
      expect($scope.msg.msg).toEqual('quiz question updated');
    });

    it('should delete a quiz question', function() {
      $scope.quizquestion = {code: '9be23'};
      $httpBackend.expectDELETE('/api/quiz/' + $scope.quizquestion.code).respond(200, {msg: 'The ether has enveloped the question and it is lost to humanity'});

      $scope.deleteQuestion();
      $httpBackend.flush();

      expect($scope.msg).toBeDefined();
      expect($scope.msg.msg).toEqual('The ether has enveloped the question and it is lost to humanity');
    });
  });
});
