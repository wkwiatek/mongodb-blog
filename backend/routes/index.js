var PostsHandler = require('./posts');

function routes(app, db) {

  var postsHandler = new PostsHandler(db);

  app.get('/posts', postsHandler.getPosts);

}

module.exports = routes;