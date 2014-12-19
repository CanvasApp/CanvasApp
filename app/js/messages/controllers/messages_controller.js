'use strict';

module.exports = function(app) {
  app.controller('messagesCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', function($scope, $http, $cookies, $base64, $location) {
    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.newMessage = function() {
      $location.path('/composemessage');
    };

    $scope.send = function () {
      $http({
        method: 'POST',
        url: ('api/sendmessage'),
        data: $scope.newMessage
      })
      .success(function(data) {
        console.log(data);
        $location.path('/inbox');
      })
      .error(function(data) {
        console.log(data);
      });
    };
    $scope.getMail = function() {
      $http({
        method: 'GET',
        url: '/api/user'
      })
      .then(function(data) {
        $http({
          method: 'GET',
          url: '/api/inbox/' + data.data.basic.email
        }).success(function(data) {
          console.log(2);
          console.log(data.usermessages[(data.usermessages.length - 1)]);
        });
      });
    };
  }]);
};

    // $scope.User = function() {
    //   console.log('find user');
    //   $http({
    //     method: 'GET',
    //     url: '/api/user'
    //   })
    //   .success(function(data) {
    //     $scope.user = data;
    //   })
    //   .error(function(data) {
    //     console.log(data);
    //   });
    // };

