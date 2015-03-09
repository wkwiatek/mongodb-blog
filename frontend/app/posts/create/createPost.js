'use strict';

angular.module('blogApp.posts.create', ['ui.router'])

  .config(function($stateProvider) {
    $stateProvider
      .state('postsCreate', {
        url: '/posts/create',
        templateUrl: 'posts/create/create-post.html',
        controller: 'createPostCtrl',
        controllerAs: 'vm'
      })
  })

  .controller('createPostCtrl', function($state, postsService) {
    var vm = this;
    vm.submitPost = function(post) {
      console.log(post);
      post.tags = vm.tags.split(',');
      postsService.createPost(post).then(function() {
        $state.go('posts');
      });
    };
  })

  .service('postsService', function($http) {
    return {
      createPost: function(post) {
        return $http.post('http://localhost:8000/posts', post);
      }
    };
  });