const { getAllArticles, getArticlesById } = require('../models/articles_model');

exports.getAllArticles = () => {
	return getAllArticles();
};

exports.getArticlesById = () => {
	return getArticlesById();
};
