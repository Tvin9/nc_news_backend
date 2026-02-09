const {
	getAllArticles: getAllArticlesService,
	getArticlesById: getArticlesByIdService,
} = require('../services/article_services');

exports.getAllArticlesController = async (req, res) => {
	const articles = await getAllArticlesService();

	res.status(200).send({ articles });
};
exports.getArticlesById = (req, res, next) => {
	const { article_id } = req.params;
	getArticlesByIdService(article_id).then((article) => {
		res.status(200).send({ article });
	});
};
