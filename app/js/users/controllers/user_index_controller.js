'use strict';

module.exports = function(app) {
  app.controller('userIndexCtrl',['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    if(!$cookies.jwt || !$cookies.jwt.length) return $location.path('/users');

    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    //gets all users.  should be admin only.
    $scope.allUsers = function() {
      console.log('find all users');
      $http({
        method: 'GET',
        url: '/api/allusers'
      })
      .success(function(data) {
        $scope.users = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    //loads the info of the currently logged in user
    $scope.User = function() {
      console.log('find user');
      $http({
        method: 'GET',
        url: '/api/user'
      })
      .success(function(data) {
        $scope.user = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.changeUserInfo = function() {
      console.log('you tried to change user info');
      $http({
        method: 'PUT',
        url: '/api/user',
        data: {
          email: $scope.user.basic.email,
          first: $scope.user.userinfo.name.first,
          last: $scope.user.userinfo.name.last,
          phone: $scope.user.userinfo.phone
        }
      })
      .success(function(data) {
        console.log(data);
        console.log(data.msg);
        console.log($scope.user.basic.email);
        console.log($scope.user.userinfo.name.first);
        console.log($scope.user.userinfo.name.last);
        console.log($scope.user.userinfo.phone);
        $scope.user = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    //for students.  can be used by teachers and admins.
    $scope.addStudent = function() {
      console.log('enroll student');
      $http({
        method: 'PUT',
        url: '/api/studentenrollment/' + $scope.course.code
      })
      .success(function(data) {
        console.log(data);
        console.log($scope.course.code);
        $scope.course.coursename = data.enrollment.coursename;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    //deletes currently logged in user.
    $scope.deleteUser = function() {
      console.log('you tried to delete user');
      if ($scope.deleteuser.email !== $scope.deleteuser.emailConfirmation)
        $scope.errors.push({msg: 'email and confirmation did not match'});
      $http({
        method: 'DELETE',
        url: '/api/user'
      })
      .success(function(data) {
        console.log('user was deleted');
        console.log(data);
        $scope.deleteuser = data;
      })
      .error(function(data){
        console.log(data);
      });
    };

    $scope.teacher = function() {
      console.log('click');
      $location.path('/courses');
    };

    $scope.adPage = function() {
      console.log('click');
      $location.path('/courses');
    };
  }]);
};
