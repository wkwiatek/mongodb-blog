var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log('get posts');
});

module.exports = router;