const {
	getAllArticles: getAllArticlesService,
	getArticlesById: getArticlesByIdService,
	getArticleComments: getArticleCommentsService,
} = require('../services/article_services');

exports.getAllArticlesController = async (req, res) => {
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
