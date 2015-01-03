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
        $scope.course = data;
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
        console.log(data);
        $scope.courses = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.getCourse = function() {
      $http({
        method: 'GET',
        url: '/api/course/' + $scope.course.code
      })
      .success(function(data) {
        console.log(data);
        console.log($scope.course);
        console.log($scope.course.code);
        $scope.course = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.updateCourse = function() {
        $http({
          method: 'PUT',
          url: '/api/courses/' + $scope.course.code,
          data:{
            name: $scope.course.name,
            schedule: $scope.course.schedule,
            description: $scope.course.description
          }
        })
        .success(function(data) {
          console.log(data);
          console.log($scope.course.code);
          $scope.course = data;
        })
        .error(function(data) {
          console.log(data);
        });
      };

    //for teachers only
    $scope.markPass = function() {
      console.log('mark as pass');
      $http({
        method: 'PUT',
        url: '/api/studentenrollmentpass/' + $scope.course.code,
        data: {
          email: $scope.user.email
        }
      })
      .success(function(data) {
        console.log(data);
        console.log($scope.user);
        console.log($scope.course);
        console.log($scope.course.code);
        console.log($scope.user.email);
        $scope.enrollment = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.deleteCourse = function() {
      $http({
        method: 'DELETE',
        url: '/api/course/' + $scope.course.code
      })
      .success(function(data) {
        console.log(data);
        $scope.msg = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.confirmTeacher = function() {
      $http({
        method: 'PUT',
        url: '/api/confirmteacher',
        data: {
          email: $scope.user
        }
      })
      .success(function(data) {
        console.log($scope.user);
        console.log(data);
        $scope.user = data;
      })
      .error(function(data) {
        console.log($scope.user);
        console.log(data);
      });
    };

    $scope.unconfirmTeacher = function() {
      $http({
        method: 'PUT',
        url: '/api/unconfirmteacher',
        data: {
          email: $scope.user
        }
      })
      .success(function(data) {
        console.log($scope.user);
        console.log(data);
        $scope.user = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };
  }]);
};
