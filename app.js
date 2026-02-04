const express = require('express');
const app = express();

app.use(express.json);

const articleRouter = require('./routes/article_route');

module.exports = { app };
