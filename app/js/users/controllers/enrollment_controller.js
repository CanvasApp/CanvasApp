'use strict';

module.exports = function(app) {
  app.controller('enrollmentCtrl', ['$scope', '$http', '$cookies', '$location', 
    function($scope, $http, $cookies, $location){

    if(!$cookies.jwt || !$cookies.jwt.length) return $location.path('/users');

    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    //for students only
    $scope.addStudent = function() {
      console.log('enroll student');
      $http({
        method: 'PUT',
        url: '/api/studentenrollment/' + $scope.course.code
      })
      .success(function(data) {
        console.log(data);
        console.log($scope.course.code);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    //for admins only
    $scope.addTeacher = function() {
      console.log('enroll teacher');
      $http({
        method: 'PUT',
        url: '/api/teacherenrollment/' + $scope.course.code
      })
      .success(function(data) {
        console.log(data);
        console.log($scope.course.code);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    //for teachers only
    $scope.markPass = function() {
      console.log('mark as pass');
      $http({
        method: 'PUT',
        url: '/api/studentenrollmentpass/' + $scope.course.code
      })
      .success(function(data) {
        console.log(data);
        console.log($scope.course.code);
      })
      .error(function(data) {
        console.log(data);
      });
    };
  }]);
};
