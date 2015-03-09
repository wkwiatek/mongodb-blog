'use strict';

angular.module('blogApp.posts.post', ['ui.router'])

  .config(function($stateProvider) {
    $stateProvider
      .state('post', {
        url: '/posts/:id',
        templateUrl: 'posts/post/post.html',
        controller: 'postCtrl',
        controllerAs: 'vm',
        resolve: {
          post: function($http, $stateParams) {
            return $http.get('http://localhost:8000/posts/' + $stateParams.id).then(function(post) {
              return post.data;
            });
          }
        }
      });
  })

  .controller('postCtrl', function(post) {
    var vm = this;
    vm.post = post;
  });