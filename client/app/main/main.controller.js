'use strict';

angular.module('poemApp')
  .controller('MainCtrl', function($scope) {

    var arr;

    $scope.poemParams = {'nStanzas': 2, 'nLines': 2};


    $scope.doPoetry = function() {
      var lines = $scope.inputText.split('\n');
      lines = _.filter(lines, function(line) { // filter out empty lines
        return (line.match(/^\s+$/) == null);
      });
      lines = _.compact(lines);
      $scope.poem = {};
      $scope.poem.stanzas = [];
      for (var i = 0; i < $scope.poemParams.nStanzas; i++) {
        arr = _.sample(lines, $scope.poemParams.nLines);
        $scope.poem.stanzas[i] = arr;
      };
      console.log($scope.poem.stanzas);
      return false;
    };
    // getSelectionText() for saving snippets to localStorage

    function getSelectionText() {

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
    }
  });
