'use strict';

angular.module('blogApp.home', ['ui.router'])

  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      });
  })

  .controller('homeCtrl', [function() {
    var vm = this;
  }]);