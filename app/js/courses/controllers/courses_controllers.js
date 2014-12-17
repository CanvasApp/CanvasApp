'use strict';

module.exports = function(app) {
  app.controller('courseCtrl', ['$scope', '$http', '$cookies','$location', function($scope, $http, $cookies, $location) {
    if(!$cookies.jwt || !$cookies.jwt.length) return $location.path('/users');

    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.courseEnrollment = function() {
      $http({
        method: 'POST',
        url: '/api/courseenrollment',
        data: $scope.newCourse
      })
      .success(function(data) {
        $scope.newCourse = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.getCourses = function() {
      $http({
        method: 'GET',
        url: '/api/courses'
      })
      .success(function(data) {
        $scope.course = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.getCourse = function() {
      $http({
        method: 'GET',
        url: '/api/courses' + $scope.code,
        data: $scope.code
      })
      .success(function(data) {
        $scope.course = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.updatedCourse = function() {
      $http({
        method: 'PUT',
        url: '/api/courses/' + $scope.code,
        data: $scope.code
      })
      .success(function() {
        $scope.edit = false;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.deleteCourse = function() {
      $http({
        method: 'DELETE',
        url: '/api/course/' + $scope.code,
        data: $scope.code
      })
      .success(function() {
        $scope.course.remove();
      });
    };
  }]);
};
