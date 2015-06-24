'use strict';

describe('Controller: SavedCtrl', function () {

  // load the controller's module
  beforeEach(module('poemApp'));

  var SavedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SavedCtrl = $controller('SavedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
