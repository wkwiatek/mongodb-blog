var express = require('express');
var mongo = require('./mongo');
var app = express();

mongo.init(function(){
  app.use('/posts', require('./routes/posts'));
  app.listen(process.env.PORT || 8000);
});
