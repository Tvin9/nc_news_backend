const { getAllArticles } = require('../models/articles_model');

exports.getAllArticles = () => {
	return getAllArticles();
};
