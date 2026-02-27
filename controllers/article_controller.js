const {
	getAllArticles: getAllArticlesService,
	getArticlesById: getArticlesByIdService,
	getArticleComments: getArticleCommentsService,
	postComment: postCommentService,
	updateVotes: updateVotesService,
} = require('../services/article_services');

//GET
exports.getAllArticlesController = async (req, res, next) => {
	try {
		const { sort_by, order, topic } = req.query;
		const articles = await getAllArticlesService(sort_by, order, topic);

		res.status(200).send({ articles });
	} catch (err) {
		next(err);
	}
};
exports.getArticlesById = (req, res, next) => {
	try {
		const { article_id } = req.params;
		getArticlesByIdService(article_id).then((article) => {
			res.status(200).send({ article });
		});
	} catch (err) {
		next(err);
	}
};

exports.getArticleComments = (req, res, next) => {
	try {
		const { article_id } = req.params;
		getArticleCommentsService(article_id).then((comments) => {
			res.status(200).send({ comments });
		});
	} catch (err) {
		next(err);
	}
};

//POST
exports.postComment = (req, res, next) => {
	try {
		const newComment = req.body;
		const { article_id } = req.params;
		postCommentService(newComment, article_id).then((comment) => {
			res.status(201).send({ comment });
		});
	} catch (err) {
		next(err);
	}
};
//PATCH
exports.updateVotes = (req, res, next) => {
	try {
		const inc_votes = req.body;
		const { article_id } = req.params;
		updateVotesService(inc_votes, article_id).then((vote) => {
			res.status(202).send({ vote });
		});
	} catch (err) {
		next(err);
	}
};
