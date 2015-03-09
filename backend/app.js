var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var mongoConnection = require('./mongoConnection');
var routes = require('./routes');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

mongoConnection(function(db){

  app.use(allowCrossDomain);
  app.use( bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  routes(app, db);

  app.listen(process.env.PORT || 8000);

});
