'use strict';
console.log('in here');
module.exports = function(app) {
  app.controller('usersCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', function($scope, $http, $cookies, $base64, $location) {
    console.log('get in controller');

    $scope.signIn = function() {
      $scope.errors = [];
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode($scope.user.email + ':' + $scope.user.password);
      console.log('get in signin');
      $http({
        method: 'GET',
        url: 'api/users'
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

    $scope.signUp = function() {
      console.log('get in signin');
      $scope.errors = [];
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode($scope.newUser.email + ':' + $scope.newUser.password);

      if($scope.newUser.password !== $scope.newUser.passwordConfirmation)
        $scope.errors.push({msg: 'Password does not match.'});

      if(!$scope.newUser.email)
        $scope.errors.push({msg: 'You failed to enter an email. How are we suppossed to keep track of you?'});

      console.log('yes');
      return $http({
        method: 'POST',
        url: '/api/users',
        data: $scope.newUser,
      })
      .success(function(data) {
        console.log('please');

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
