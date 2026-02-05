const {
	getAllArticles: getAllArticlesService,
} = require('../services/article_services');

exports.getAllArticlesController = async (req, res) => {
	const articles = await getAllArticlesService();

	res.status(200).send({ articles });
};
