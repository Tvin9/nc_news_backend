const article_router = require('express').Router();
const {
	getAllArticlesController,
	getArticlesById,
	getArticleComments,
	postComment,
	updateVotes,
} = require('../controllers/article_controller');

//GET routes
article_router.get('/', getAllArticlesController);
article_router.get('/:article_id', getArticlesById);
article_router.get('/:article_id/comments', getArticleComments);

//POST routes
article_router.post('/:article_id/comments', postComment);

//PATCH routes
article_router.patch('/:article_id', updateVotes);

module.exports = article_router;
