'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('Users Controller', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $cookies;

  beforeEach(angular.mock.model,('codeApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller
  }));

  it('should be able to create a controller', function() {
    var userController = $controllerConstructor('userCtrl', {$scope: $scope});
    expect(typeof userController).toBe('object');
  });
});
