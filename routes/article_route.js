const express = require('express');
const article_route = express.Router();

article_route.get('/api/articles', (req, res) => {
	res.send('Articles page');
});

module.exports = { article_route };
