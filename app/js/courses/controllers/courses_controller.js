'use strict';

module.exports = function(app) {
  app.controller('courseCtrl', ['$scope', '$http', '$cookies','$location', function($scope, $http, $cookies, $location) {
    if(!$cookies.jwt || !$cookies.jwt.length) return $location.path('/users');

    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.createCourse = function() {
      $http({
        method: 'POST',
        url: '/api/courseenrollment',
        data: {
          name: $scope.course.name,
          schedule: $scope.course.schedule,
          description: $scope.course.description
        }
      })
      .success(function(data) {
        console.log(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.getCourses = function() {
      $http({
        method: 'GET',
        url: '/api/courses'
      })
      .success(function(data) {
        console.log(data)
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.getCourse = function() {
      $http({
        method: 'GET',
        url: '/api/courses'
        data: {
          code: $scope.code
        }
      })
      .success(function(data) {
        $scope.course = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.updateCourse = function() {
      $http({
        method: 'GET',
        url: '/api/courses'
        data: {
          code: $scope.code
        }
      })
      .then(function(data) {
        $http)({
          method: 'PUT',
          url: '/api/courses/' + $scope.code
          data:{
            name: $scope.course.name,
            schedule: $scope.course.schedule,
            description: $scope.course.description
          } 
        })
        .success(function(data) {
        console.log(data);
        })
        .error(function(data) {
          console.log(data);
        });
      });  
    };

    $scope.deleteCourse = function() {
      $http({
        method: 'DELETE',
        url: '/api/course'
        data: {
          code: $scope.code
        }
      })
      .success(function(data) {
        console.log(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };
  }]);
};
