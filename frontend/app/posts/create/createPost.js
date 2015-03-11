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
    var isEdit = post ? true : false;
    console.log(isEdit);
    vm.post = post;
    vm.tags = vm.post ? vm.post.tags.join(',') : '';
    vm.submitPost = function(post) {
      post.tags = vm.tags.split(',');
      if (isEdit) {
        postsService.updatePost(post).then(function() {
          $state.go('posts');
        });
      }
      else {
        post.date = new Date();
        postsService.createPost(post).then(function() {
          $state.go('posts');
        });
      }
    };
  })

  .service('postsService', function($http) {
    return {
      createPost: function(post) {
        return $http.post('http://localhost:8000/posts', post);
      },
      updatePost: function(post) {
        var id = post._id;
        delete post._id;
        return $http.put('http://localhost:8000/posts/' + id, post);
      }
    };
  });