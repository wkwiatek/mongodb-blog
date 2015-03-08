var express = require('express');
var app = express();
var mongoConnection = require('./mongoConnection');
var routes = require('./routes');

mongoConnection(function(db){
  routes(app, db);
  app.listen(process.env.PORT || 8000);
});
