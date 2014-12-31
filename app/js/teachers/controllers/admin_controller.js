'use strict';

module.exports = function(app) {
  app.controller('adminCtrl', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    if(!$cookies.jwt || !$cookies.jwt.length) return $location.path('/users');

    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.confirmAdmin = function() {
      $http({
        method: 'PUT',
        url: '/api/confirmadmin'
      })
      .success(function(data) {
        console.log(data);
        $scope.msg = 'success!';
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
        $scope.enrollments = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };
  }]);
};
