//Bring in error handlers
const NotFoundError = require('./errors/not_found_error');

//Bring in needed routers
const article_router = require('./routes/article_route');
const user_router = require('./routes/user_route');
const comment_router = require('./routes/comment_route');

//Creates app
const express = require('express');
const app = express();

//Enables JSON
app.use(express.json());

//Points endpoints to appropriate router
app.use('/api/articles', article_router);
app.use('/api/users', user_router);
app.use('/api/comments', comment_router);

//Error handling
app.all('/*path', (req, res, next) => {
	res.status(404).send({ msg: 'Path not found!' });
});

module.exports = app;
