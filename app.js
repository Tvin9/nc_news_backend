const article_router = require('./routes/article_route');
const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/articles', article_router);

module.exports = app;
