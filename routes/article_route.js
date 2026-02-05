const article_router = require('express').Router();
const {
	getAllArticlesController,
} = require('../controllers/article_controller');

article_router.get('/', getAllArticlesController);

module.exports = article_router;
