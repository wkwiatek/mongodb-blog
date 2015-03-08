var express = require('express');
var router = express.Router();
var db = require('../mongo').db;
var postsColl = db.collection('posts');

router.get('/', function(req, res) {
  postsColl.find().toArray(function(err, result) {
    res.json(result);
  });
});

module.exports = router;