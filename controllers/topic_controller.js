const {
	getAllTopics: getAllTopicsService,
} = require('../services/topic_services');

exports.getAllTopics = async (req, res) => {
	const topics = await getAllTopicsService();

	res.status(200).send({ topics });
};
