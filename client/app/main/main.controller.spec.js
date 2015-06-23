(function(){
'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('poemApp'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  var inputText = 'Jesus got up one day a little later than usual. He had been dream-\ning so deep there was nothing left in his head. What was it?\n\nA nightmare, dead bodies walking all around him, eyes rolled\nback, skin falling off. But he wasn\'t afraid of that. It was a beau-\ntiful day. How \'bout some coffee? Don\'t mind if I do. Take a little\nride on my donkey, I love that donkey. Hell, I love everybody.';
  
  it('should expect default values', function () {
    expect(scope.poemParams.nStanzas).toEqual(2);
    expect(scope.poemParams.nLines).toEqual(2);
  });

  it('should generate a poem', function () {
    scope.doPoetry(inputText, scope.poemParams);
    expect(scope.poem.stanzas.length).toEqual(scope.poemParams.nStanzas);
  });
});
}());