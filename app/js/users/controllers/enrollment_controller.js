'use strict';

module.exports = function() {
  app.controller('enrollmentCtrl', ['$scope', '$http', '$cookies', '$location', 
    function($scope, $http, $cookies, $location){

    if(!$cookies.jwt || !$cookies.jwt.length) return $location.path('/users');

    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.addStudent = function() {
      
    }
  }])
}
