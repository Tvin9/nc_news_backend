//Creates app
const express = require('express');
const app = express();

//import cors
const cors = require('cors');
app.use(cors({ credentials: true }));

//Bring in error handlers
const NotFoundError = require('./errors/not_found_error');

//Bring in needed routers
const article_router = require('./routes/article_route');
const user_router = require('./routes/user_route');
const comment_router = require('./routes/comment_route');
const topic_router = require('./routes/topic_route');

//Enables JSON
app.use(express.json());

//Points endpoints to appropriate router
app.use('/api/articles', article_router);
app.use('/api/users', user_router);
app.use('/api/comments', comment_router);
app.use('/api/topics', topic_router);

//Links html and css
app.use(express.static('public'));

//Error handling
app.all('/*path', (req, res, next) => {
	res.status(404).send({ msg: 'Path not found!' });
});

module.exports = app;
