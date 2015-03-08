'use strict';

angular.module('blogApp.posts', ['ui.router'])

  .config(function($stateProvider) {
    $stateProvider
      .state('posts', {
        url: '/posts',
        templateUrl: 'posts/posts.html',
        controller: 'postsCtrl',
        controllerAs: 'vm'
      })
  })

  .controller('postsCtrl', [function() {
    var vm = this;
  }]);