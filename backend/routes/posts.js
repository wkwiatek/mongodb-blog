var express = require('express');
var ObjectId = require('mongodb').ObjectID;

function postsHandler(db) {

  var postsColl = db.collection('posts');

  this.getPost = function(req, res) {
    postsColl.findOne({ _id: new ObjectId(req.params.id) }, function(err, result) {
      res.json(result);
    });
  };

  this.getPosts = function(req, res) {
    postsColl.find({}, { sort: [ 'date', 'desc'] }).toArray(function(err, result) {
      res.json(result);
    });
  };

  this.getPostsByTag = function(req, res) {
    postsColl.find({ tags: req.params.tag }, { sort: [ 'date', 'desc'] }).toArray(function(err, result) {
      res.json(result);
    });
  };

  this.createPost = function(req, res) {
    postsColl.insert(req.body, function(err, result) {
      res.json(result);
    });
  };

  this.updatePost = function(req, res) {
    postsColl.update({ _id: new ObjectId(req.params.id) }, req.body, function(err, result) {
      res.json(result);
    });
  };

  this.getTags = function(req, res) {
    postsColl.aggregate([
      { $project: { tags: 1 } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } }
    ], function(err, result) {
      res.json(result);
    });
  };

  this.createComment = function(req, res) {
    postsColl.update(
      { _id: new ObjectId(req.body.postId) },
      { $push: { comments: req.body.comment } },
      function(err, result) {
        res.json(result);
      }
    );
  };

  this.likeComment = function(req, res) {
    var commentLikesSelector = {};
    commentLikesSelector['comments.' + req.body.commentIndex + '.likes'] = 1;
    postsColl.update(
      { _id: new ObjectId(req.body.postId) },
      { $inc: commentLikesSelector },
      function(err, result) {
        res.json(result);
      }
    );
  };

}

module.exports = postsHandler;