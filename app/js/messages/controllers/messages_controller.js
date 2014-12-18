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
        data: $scope.email
      })
      .success(function() {
        $location.path('/inbox');
      })
      .error(function(data) {
        console.log(data);
      });
    };
    $scope.getMail = function() {
      $http({
        method: 'GET',
        url: '/api/inbox'
      })
      .success(function(data) {
        console.log(data);
      });
    };
  }]);
};



