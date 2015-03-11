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

  .controller('postCtrl', function($state, post, commentService) {
    var vm = this;
    vm.post = post;

    vm.submitComment = function(comment, postId) {
      commentService.submitComment({
        comment: comment,
        postId: postId
      }).then(function() {
        $state.go('post', { id: vm.post._id }, { reload: true });
      });
    };

    vm.likeComment = function(commentIndex, postId) {
      commentService.likeComment({
        commentIndex: commentIndex,
        postId: postId
      }).then(function() {
        $state.go('post', { id: vm.post._id }, { reload: true });
      });
    };

  })

  .service('commentService', function($http) {
    return {
      submitComment: function(comment) {
        return $http.post('http://localhost:8000/comment', comment);
      },
      likeComment: function(comment) {
        return $http.post('http://localhost:8000/comment/like', comment);
      }
    };
  });