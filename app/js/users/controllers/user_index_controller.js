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

    $scope.changeUserInfo = function(userinfo) {
      $http({
        method: 'PUT',
        url: '/api/user',
        data: $scope.user
      })
      .success(function(data) {
        $scope.user.email = data.email;
        $scope.user.phonenumber = data.phonenumber;
        $scope.user.firstname = data.firstname;
        $scope.user.lastname = data.lastname;
        console.log(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.deleteUser = function(email, emailConfirmation) {
      if ($scope.user.email !== $scope.user.emailConfirmation) 
        $scope.errors.push({msg: 'email and confirmation did not match'});
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
