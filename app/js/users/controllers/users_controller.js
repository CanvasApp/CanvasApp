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
        $scope.push.errors(data);
      });
    };

    $scope.newUser = function() {
      $scope.errors = [];
      // $http.defaults.headers.common['Authorization'] = 'Basic' + $base64.encode($scope.newUser.email + ':' + $scope.newUser.password);

      // if($scope.newUser.password !== $scope.newUser.passwordConfirmation)
      //   $scope.errors.push({msg: 'Password does not match.'});

      // if(!$scope.newUser.email)
      //   $scope.errors.push({msg: 'You failed to enter an email. How are we suppossed to keep track of you?'});


      // if(!$scope.newUser.firstName)
      //   $scope.errors.push({msg: 'Please enter your first name so we can say hi.'});

      // if(!$scope.newUser.lastName)
      //   $scope.errors.push({msg: 'Give us your last name, unless you want us to get it from the NSA'});

      $http({
        method: 'POST',
        url: '/api/users',
        data: $scope.newUser()
      })
      .success(function(data) {
        console.log($scope.newUser);
        console.log(data);
        $cookies.jwt = data.jwt;
        $location.path('/classtree');
      })
      .error(function() {
        $scope.push.errors({msg: 'something went wrong'});
      });
    };

  }]);
};
