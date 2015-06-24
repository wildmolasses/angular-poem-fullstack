(function() {
  'use strict';

  angular.module('poemApp')
    .controller('MainCtrl', function($scope, $http, socket, $log, Auth) {

      $scope.isLoggedIn = Auth.isLoggedIn;

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
        if (!bodyOfText) {
          console.log("type something...");
        } else {
          var lines = cleanLines(bodyOfText);
          $scope.poem = constructPoem(lines, poemParams);
        }
      };

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
