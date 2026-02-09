const { getAllArticles, getArticlesById } = require('../models/articles_model');

exports.getAllArticles = () => {
	return getAllArticles();
};

exports.getArticlesById = (article_id) => {
	return getArticlesById(article_id);
};
