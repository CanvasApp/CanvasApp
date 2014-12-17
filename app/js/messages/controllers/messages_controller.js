'use strict';

module.exports = function(app) {
  app.controller('usersCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', function($scope, $http, $cookies, $base64, $location) {

    $scope.newMessage = function() {
      $location.path('/composemessage');
    };

    $scope.send = function () {
      $http({
        method: 'POST',
        url: ('api/sendmessage'),
        data: $scope.send
      });
    };
  }]);
};
