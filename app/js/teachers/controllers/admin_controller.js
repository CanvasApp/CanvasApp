'use strict';

module.exports = function(app) {
  app.controller('adminCtrl', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    if(!$cookies.jwt || !$cookies.jwt.length) return $location.path('/users');

    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.confirmAdmin = function() {
      $http({
        method: 'PUT',
        url: '/api/confirmadmin',
        data: $scope._id
      })
      .success(function(data) {
        $scope.user = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };
  }]);
};
