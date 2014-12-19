'use strict';

module.exports = function(app) {
  app.controller('teacherCtrl', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location){
    if(!$cookies.jwt || !$cookies.jwt.length) return $location.path('/users');

    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.confirmTeacher = function() {
      $http({
        method: 'PUT',
        url: '/api/confirmteacher',
        data: {
          email: $scope.user
        }
      })
      .success(function(data) {
        console.log($scope.user);
        console.log(data);
      })
      .error(function(data) {
        console.log($scope.user);
        console.log(data);
      });
    };

    $scope.unconfirmTeacher = function() {
      $http({
        method: 'PUT',
        url: '/api/unconfirmTeacher',
        data: {
          email: $scope.user
        }
      })
      .success(function(data) {
        console.log($scope.user);
        console.log(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };
  }]);
};
