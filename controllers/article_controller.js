const {
	getAllArticles: getAllArticlesService,
	getArticlesById: getArticlesByIdService,
} = require('../services/article_services');

exports.getAllArticlesController = async (req, res) => {
	const articles = await getAllArticlesService();

	res.status(200).send({ articles });
};

exports.getArticlesById = async (req, res) => {
	const article_id = await getArticlesByIdService();

	res.status(200).send({ article_id });
};
