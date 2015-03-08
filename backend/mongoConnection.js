var mongoClient = require('mongodb').MongoClient;

var mongoConnection = function(callback) {
  mongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
    if (err) throw err;
    callback(db);
  });
};

module.exports = mongoConnection;