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
          data: $scope.quizQuestion
        })
        .success(function(data) {
          $scope.question = data.question;
          $scope.questionValue.javascript = data.questionValue.javascript;
          $scope.questionValue.python = data.questionValue.python;
          $scope.questionValue.ruby = data.questionValue.ruby;
          $scope.questionValue.objectiveC = data.questionValue.objectiveC;
          console.log(data);
        })
        .error(function(data) {
          console.log(data);
        });
      };

      $scope.getQuestions = function() {
        $http({
          method: 'GET',
          url: '/api/quizzes'
        })
        .success(function(data) {
          $scope.data = data;
        })
        .error(function(data) {
          console.log(data);
        });
      };

      $scope.getOneQuestion = function() {
        $http({
          method: 'GET',
          url: '/api/quiz/' + $scope.code
        })
        .success(function(data) {
          $scope.data = data;
        })
        .error(function(data) {
          console.log(data);
        });
      };

      $scope.changeQuestion = function() {
        $http({
          method: 'PUT',
          url: '/api/quiz/' + $scope.code,
          data: $scope.quiz
        })
        .success(function(data) {
          $scope.quiz.quizQuestion.question = data.quiz.question;
          $scope.quiz.quizQuestion.questionValue.javascript = data.quiz.questionValue.javascript;
          $scope.quiz.quizQuestion.questionValue.python = data.quiz.questionValue.python;
          $scope.quiz.quizQuestion.questionValue.ruby = data.quiz.questionValue.ruby;
          $scope.quiz.quizQuestion.questionValue.objectiveC = data.quiz.questionValue.objectiveC;
          console.log(data);
        })
        .error(function(data) {
          console.log(data);
        });
      };

      $scope.deleteQustion = function() {
        $http({
          method: 'DELETE',
          url: '/api/quiz/' + $scope.code,
          data: $scope.code
        })
        .success(function(data) {
          $scope.quiz.remove();
          console.log(data);
        });
      };
    }]);
};
