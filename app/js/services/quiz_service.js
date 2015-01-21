// 'use strict';

// module.exports = function(app) {
//   var handleErrors = function(data) {
//     console.log(data);
//   };

//   app.factory('QuizIntro', ['$scope', '$http', function($scope, $http) {
//     return function(quizanswer) {
//       return {
//         Question: function() {
//           return $http({
//             method: 'GET',
//             url: '/api/quiz/' + $scope.quizanswer.code
//           })
//           .error(function(data) {
//             console.log(data);
//           });
//         },

//         Answer: function() {
          
//         }
//       };
//     };
//   }]);
// };
