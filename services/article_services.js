const {
	getAllArticles,
	getArticlesById,
	getArticleComments,
	postComment,
	updateVotes,
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
	return postComment(comment, article_id);
};

exports.updateVotes = (inc_votes, article_id) => {
	return updateVotes(inc_votes, article_id);
};
