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
          },
          tags: function($http) {
            return $http.get('http://localhost:8000/tags').then(function(tags) {
              return tags.data;
            });
          }
        }
      });
  })

  .controller('postsCtrl', function(posts, tags, tagService) {
    var vm = this;
    vm.posts = posts;
    vm.tags = tags;
    vm.filterByTag = function(tag) {
      tagService.getPostsByTag(tag).then(function(posts) {
        vm.posts = posts.data;
      });
    }
  })

  .service('tagService', function($http) {
    return {
      getPostsByTag: function(tag) {
        return $http.get('http://localhost:8000/tags/' + tag);
      }
    };
  });