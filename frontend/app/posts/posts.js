'use strict';

angular.module('blogApp.posts', ['ui.router'])

  .config(function($stateProvider) {
    $stateProvider
      .state('posts', {
        url: '/posts',
        templateUrl: 'posts/posts.html',
        controller: 'postsCtrl',
        controllerAs: 'vm',
        resolve: {
          posts: function($http) {
            return $http.get('http://localhost:8000/posts').then(function(posts) {
              return posts.data;
            });
          }
        }
      });
  })

  .controller('postsCtrl', function(posts) {
    var vm = this;
    vm.posts = posts;
  });