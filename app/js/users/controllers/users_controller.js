'use strict';
console.log('in here');
module.exports = function(app) {
  app.controller('usersCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', function($scope, $http, $cookies, $base64, $location) {
    console.log('get in controller');

    $scope.signIn = function() {
      $scope.errors = [];
      console.log($scope.user.email);
      console.log($scope.user.password);
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode($scope.user.email + ':' + $scope.user.password);
      console.log('get in signin');
      $http({
        method: 'GET',
        url: '/api/users'
      })
      .success(function(data) {
        console.log('sign in worked');
        $scope.msg = 'success!';
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
      console.log('get in signup');
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
        console.log('sign up worked');
        console.log(data);
        $scope.msg = 'success!';
        $cookies.jwt = data.jwt;
        $location.path('/userprofile');
      })
      .error(function(data) {
        console.log(data);
        $scope.errors.push({msg: 'something went wrong'});
      });
    };

    $scope.signOut = function() {
      delete $cookies['jwt'];
      $location.path('/signIn');
    };
  }]);
};
