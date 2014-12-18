'use strict';

module.exports = function(app) {
  app.controller('quizCtrl', ['$scope', '$http', '$cookies', '$location', 
    function($scope, $http, $cookies, $location) {
      if(!$cookies.jwt || !$cookies.jwt.length) return $location.path('/users');

      $http.defaults.headers.common['jwt'] = $cookies.jwt;

      $scope.createQuestion = function() {
        $http({
          method: 'POST',
          url: '/api/quiz',
          data: {
            quizQuestion: {
              question: $scope.quiz.quizQuestion.question,
              questionValue: {
                javascript: $scope.quiz.quizQuestion.questionValue.javascript,
                python: $scope.quiz.quizQuestion.questionValue.python,
                ruby: $scope.quiz.quizQuestion.questionValue.ruby,
                objectiveC: $scope.quiz.quizQuestion.questionValue.objectiveC
              }
            }
          } 
        })
        .success(function(data) {
          console.log(data);
        })
        .error(function(data) {
          console.log(data);
        });
      };

      $scope.getQuestions = function() {
        console.log('getting questions');
        $http({
          method: 'GET',
          url: '/api/quizzes'
        })
        .success(function(data) {
          console.log(data);
          $scope.quizquestions = data;
        })
        .error(function(data) {
          console.log(data);
        });
      };

      $scope.getOneQuestion = function() {
        console.log('get one question');
        $http({
          method: 'GET',
          url: '/api/quiz/' + $scope.quizquestion.code
        })
        .success(function(data) {
          console.log(data);
          $scope.quizquestion = data;
        })
        .error(function(data) {
          console.log(data);
        });
      };

      $scope.changeQuestion = function() {
        $http({
          method: 'PUT',
          url: '/api/quiz/' + $scope.quiz.code,
          data: {
            quizQuestion: {
              question: $scope.quiz.quizQuestion.question,
              questionValue: {
                javascript: $scope.quiz.quizQuestion.questionValue.javascript,
                python: $scope.quiz.quizQuestion.questionValue.python,
                ruby: $scope.quiz.quizQuestion.questionValue.ruby,
                objectiveC: $scope.quiz.quizQuestion.questionValue.objectiveC
              }
            } 
          }
        })
        .success(function(data) {
          console.log($scope.code);
          console.log(data);
        })
        .error(function(data) {
          console.log(data);
        });
      };

      $scope.deleteQuestion = function() {
        $http({
          method: 'DELETE',
          url: '/api/quiz/' + $scope.quizquestion.code
        })
        .success(function(data) {
          console.log(data);
        })
        .error(function(data) {
          console.log(data);
        });
      };
    }]);
};
