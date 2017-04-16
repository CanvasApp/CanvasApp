'use strict';

module.exports = function(app) {
  app.controller('messagesCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', function($scope, $http, $cookies, $base64, $location) {
    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.compose = function() {
      $location.path('/new');
    };

    $scope.send = function () {
      $http({
        method: 'POST',
        url: 'api/sendmessage',
        data: {
          to: $scope.newMessage.to,
          message: {
            from: $scope.newMessage.message.from,
            subject: $scope.newMessage.message.subject,
            main: $scope.newMessage.message.main
          }
        }
      })
      .success(function(data) {
        console.log(data);
        console.log($scope.newMessage.message.main);
        console.log($scope.newMessage.message.subject);
        console.log($scope.newMessage.message.from);
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
          //var arr = (data.usermessages.length - 1);
          $scope.usermessages = data.usermessages[data.usermessages.length - 1];
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

