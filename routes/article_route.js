const article_router = require('express').Router();
const {
	getAllArticlesController,
	getArticlesById,
} = require('../controllers/article_controller');

article_router.get('/', getAllArticlesController);
article_router.get('/:article_id', getArticlesById);

module.exports = article_router;
