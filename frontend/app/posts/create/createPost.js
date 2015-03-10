'use strict';

angular.module('blogApp.posts.upsert', ['ui.router'])

  .config(function($stateProvider) {
    $stateProvider
      .state('postsUpsert', {
        url: '/posts/create/:id',
        templateUrl: 'posts/create/create-post.html',
        controller: 'upsertPostCtrl',
        controllerAs: 'vm',
        resolve: {
          post: function($http, $stateParams) {
            if($stateParams.id) {
              return $http.get('http://localhost:8000/posts/' + $stateParams.id).then(function(post) {
                return post.data;
              });
            }
            else {
              return null;
            }
          }
        }
      })
  })

  .controller('upsertPostCtrl', function($state, post, postsService) {
    var vm = this;
    vm.post = post;
    vm.tags = vm.post ? vm.post.tags.join(',') : '';
    vm.submitPost = function(post) {
      post.tags = vm.tags.split(',');
      postsService.submitPost(post).then(function() {
        $state.go('posts');
      });
    };
  })

  .service('postsService', function($http) {
    return {
      submitPost: function(post) {
        return $http.post('http://localhost:8000/posts', post);
      }
    };
  });