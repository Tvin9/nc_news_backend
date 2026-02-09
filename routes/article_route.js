const article_router = require('express').Router();
const {
	getAllArticlesController,
	getArticlesById,
	getArticleComments,
} = require('../controllers/article_controller');

article_router.get('/', getAllArticlesController);
article_router.get('/:article_id', getArticlesById);
article_router.get('/:article_id/comments', getArticleComments);

module.exports = article_router;
