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
    postsColl.find().toArray(function(err, result) {
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
      { $group: { _id: '$tags'} }
    ], function(err, result) {
      res.json(result);
    });
  };

}

module.exports = postsHandler;