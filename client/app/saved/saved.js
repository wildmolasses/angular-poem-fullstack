'use strict';

angular.module('poemApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('saved', {
        url: '/saved',
        templateUrl: 'app/saved/saved.html',
        controller: 'SavedCtrl'
      });
  });