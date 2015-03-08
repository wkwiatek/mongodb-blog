'use strict';

angular.module('blogApp', [
    'ui.router',

    'blogApp.home',
    'blogApp.posts'
  ])

  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('home');
  })

  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });