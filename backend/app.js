var express = require('express');
var app = express();

app.use('/posts', require('./routes/posts'));

app.listen(process.env.PORT || 8000);