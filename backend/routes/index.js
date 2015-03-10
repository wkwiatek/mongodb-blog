var PostsHandler = require('./posts');

function routes(app, db) {

  var postsHandler = new PostsHandler(db);

  app.get('/posts', postsHandler.getPosts);
  app.get('/posts/:id', postsHandler.getPost);
  app.post('/posts', postsHandler.createPost);
  app.put('/posts/:id', postsHandler.updatePost);

  app.get('/tags', postsHandler.getTags);

}

module.exports = routes;