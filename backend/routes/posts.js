var express = require('express');

function postsHandler(db) {

  var postsColl = db.collection('posts');

  this.getPosts = function(req, res) {
    postsColl.find().toArray(function(err, result) {
      res.json(result);
    });
  }

  this.createPost = function(req, res) {
    postsColl.insert(req.body, function(err, result) {
      res.json(result);
    });
  }

}

module.exports = postsHandler;