// 'use strict';

// //no jwt required for this controller.

// module.exports = function(app) {
//   app.controller('introCtrl', ['$scope', '$http', '$location', 
//     function($scope, $http, $location) {

//       $scope.getOneQuizQuestion = function() {
//         $http({
//           method: 'GET',
//           url: '/api/introquiz' + $scope.code,
//           data: $scope.question
//         })
//         .success(function(data) {
//           console.log(data);
//           console.log($scope.question);
//           $scope.question = data;
//         })
//         .error(function(data) {
//           console.log(data);
//         });
//       };
//     }]);
// };
