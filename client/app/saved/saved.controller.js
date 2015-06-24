(function(){
    'use strict';

angular.module('poemApp')
  .controller('SavedCtrl', function($scope, $http, socket, $location) {
    $http.get('/api/poems').success(function(poems) {
      $scope.savedPoems = poems;

      socket.syncUpdates('poem', $scope.savedPoems, function(event, poem, poems) {
        // This callback is fired after the poems array is updated by the socket listeners
        if (poems.length < 1) { $location.path('/'); } else {
        // sort the array every time its modified
        poems.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a > b ? -1 : a < b ? 1 : 0;
        });} 
      });
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('poem');
    });

    $scope.deletePoem = function(poem) {
      $http.delete('/api/poems/' + poem._id);
    };
  });
}());