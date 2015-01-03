'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('the quiz controller test', function() {
  var $controllerConstructor;
  //var $httpBackend;
  var $scope;
  var $cookies = {jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N…4NDV9.5dr6hQ2rJr9972-LuyxcL6xnVVRRwdbJ7CDNHKDgcrQ'};
  // var quiz = {code: '9be23',
  //             answerArray: [],
  //             quizQuestion: 
  //              { question: 'What the hell is going on?',
  //                questionValue: { objectiveC: true, ruby: true, python: true, javascript: true }}
  //              }

  beforeEach(angular.mock.module('codeApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create the quiz controller', function() {
    var quizController = $controllerConstructor('quizCtrl', {$scope: $scope, $cookies: $cookies});
    expect(typeof quizController).toBe('object');
  });

});
