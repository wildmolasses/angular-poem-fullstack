(function() {
  'use strict';

  angular.module('poemApp')
    .controller('MainCtrl', function($scope, $http, socket, $log) {

      $scope.poemParams = {
        'nStanzas': 2,
        'nLines': 2
      };

      $scope.poem = {};

      var splitToLines = function(bodyOfText) {
        return bodyOfText.split('\n');
      };

      var deleteEmptyLines = function(lines) {
        return _.filter(lines, function(line) {
          return (line.match(/^\s+$/) === null);
        });
      };

      var cleanLines = function(lines) {
        var splitLines = splitToLines(lines);
        var filteredLines = deleteEmptyLines(splitLines);
        return _.compact(filteredLines);
      };

      var constructPoem = function(lines, poemParams, poem) {
        poem = poem || {};
        poem.stanzas = poem.stanzas || [];
        var newStanza = _.sample(lines, $scope.poemParams.nLines);
        poem.stanzas.push(newStanza);
        if (poem.stanzas.length < poemParams.nStanzas) {
          return constructPoem(lines, poemParams, poem);
        } else {
          return poem;
        }
      };

      $scope.doPoetry = function(bodyOfText, poemParams) {
        var lines = cleanLines(bodyOfText);
        $scope.poem = constructPoem(lines, poemParams);
      };


      $http.get('/api/poems').success(function(poems) {
        $scope.savedPoems = poems;

        socket.syncUpdates('poem', $scope.savedPoems, function(event, poem, poems) {
          // This callback is fired after the poems array is updated by the socket listeners

          // sort the array every time its modified
          poems.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a > b ? -1 : a < b ? 1 : 0;
          });
        });
      });

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('poem');
      });

      $scope.addPoem = function() {
        $http.post('/api/poems', {
          content: $scope.poem
        });
        $scope.poem = '';
      };


      function getSelectionText() { // snippets of text

        try {
          if (window.ActiveXObject) {
            var c = document.selection.createRange();
            return c.htmlText;
          }
          var nNd = document.createElement('span');
          var w = getSelection().getRangeAt(0);
          w.surroundContents(nNd);
          return nNd.innerHTML;
        } catch (e) {
          if (window.ActiveXObject) {
            return document.selection.createRange();
          } else {
            return getSelection();
          }
        }
      };
    });
}());
