const {
	getAllArticles,
	getArticlesById,
	getArticleComments,
} = require('../models/articles_model');

exports.getAllArticles = () => {
	return getAllArticles();
};

exports.getArticlesById = (article_id) => {
	return getArticlesById(article_id);
};

exports.getArticleComments = (article_id) => {
	return getArticleComments(article_id);
};
