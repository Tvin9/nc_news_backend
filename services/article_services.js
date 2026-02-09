const {
	getAllArticles,
	getArticlesById,
	getArticleComments,
	postComment,
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

exports.postComment = (comment, article_id) => {
	//console.log(comment);
	return postComment(comment, article_id);
};
