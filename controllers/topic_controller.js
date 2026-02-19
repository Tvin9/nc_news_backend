const {
	getAllTopics: getAllTopicsService,
} = require('../services/topic_services');

exports.getAllTopics = async (req, res) => {
	const topics = await getAllTopicsService();
	console.log('test');
	res.status(200).send({ topics });
};
