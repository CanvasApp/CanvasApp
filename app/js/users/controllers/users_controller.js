'use strict';
console.log('in here');
module.exports = function(app) {
  app.controller('usersCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', function($scope, $http, $cookies, $base64, $location) {

    $scope.signIn = function() {
      $scope.errors = [];
      $http.defaults.headers.common['Authorization'] = 'Basic' + $base64.encode($scope.user.email + ':' + $scope.user.password);

      $http({
        method: 'GET',
        url: '/api/users'
      })
      .success(function(data) {
        console.log('worked');
        $cookies.jwt = data.jwt;
        $location.path('/dash');
      })
      .error(function(data) {
        console.log('did not work');
        console.log(data);
        $scope.errors.push(data);
      });
    };

    $scope.signIn = function() {
      $scope.errors = [];
      if ($scope.newUser.password !== $scope.newUser.passwordConfirmation) $scope.errors.push({msg: 'password and confirmation did not match'});
      if (!$scope.newUser.email) $scope.errors.push({msg: 'did not specify an email'});

      $http({
        method: 'POST',
        url: '/api/users',
        data: $scope.newUser,
      })
      .success(function(data) {
        console.log($scope.newUser);
        console.log(data);
        $cookies.jwt = data.jwt;
        $location.path('/classtree');
      })
      .error(function(data) {
        console.log(data);
        $scope.errors.push({msg: 'something went wrong'});
      });
    };

  }]);
};
