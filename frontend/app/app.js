'use strict';

angular.module('blogApp', [
    'ui.router',

    'blogApp.home',
    'blogApp.posts',
    'blogApp.posts.create',
    'blogApp.posts.post'
  ])

  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  })

  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });