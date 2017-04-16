'use strict';

module.exports = function(app) {
  app.controller('teacherCtrl', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location){
    if(!$cookies.jwt || !$cookies.jwt.length) return $location.path('/users');

    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.confirmTeacher = function() {
      $http({
        method: 'PUT',
        url: '/api/confirmteacher',
        data: $scope.email
      })
      .success(function(data) {
        $scope.user = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.unconfirmTeacher = function() {
      $http({
        method: 'PUT',
        url: '/api/unconfirmTeacher',
        data: $scope.email
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
