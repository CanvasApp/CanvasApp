'use strict';

module.exports = function(app) {
  app.controller('userIndexCtrl',['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    if(!$cookies.jwt || !$cookies.jwt.length) return $location.path('/users');

    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.allUsers = function() {
      $http({
        method: 'GET',
        url: '/api/allusers'
      })
      .success(function(data) {
        $scope.users = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.User = function() {
      $http({
        method: 'GET',
        url: '/api/user',
        data: $scope.user
      })
      .success(function(data) {
        $scope.user = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.changeUserInfo = function() {
      $http({
        method: 'PUT',
        url: '/api/user',
        data: $scope.user
      })
      .success(function(data) {
        $scope.user = data;
        console.log(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.deleteUser = function() {
      $http({
        method: 'DELETE',
        url: '/api/user',
        data: $scope.user
      })
      .success(function () {
        $scope.user.remove();
      });
    };
  }]);
};
