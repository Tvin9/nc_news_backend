const {
	getAllArticles: getAllArticlesService,
	getArticlesById: getArticlesByIdService,
	getArticleComments: getArticleCommentsService,
	postComment: postCommentService,
	updateVotes: updateVotesService,
} = require('../services/article_services');

//GET
exports.getAllArticlesController = async (req, res) => {
	const { sort_by, order } = req.query;
	const articles = await getAllArticlesService();

	res.status(200).send({ articles });
};
exports.getArticlesById = (req, res) => {
	const { article_id } = req.params;
	getArticlesByIdService(article_id).then((article) => {
		res.status(200).send({ article });
	});
};

exports.getArticleComments = (req, res) => {
	const { article_id } = req.params;
	getArticleCommentsService(article_id).then((comments) => {
		res.status(200).send({ comments });
	});
};

//POST
exports.postComment = (req, res) => {
	const newComment = req.body;
	const { article_id } = req.params;
	postCommentService(newComment, article_id).then((comment) => {
		res.status(201).send({ comment });
	});
};

//PATCH
exports.updateVotes = (req, res) => {
	const inc_votes = req.body;
	const { article_id } = req.params;
	updateVotesService(inc_votes, article_id).then((vote) => {
		res.status(202).send({ vote });
	});
};
