const {
	getAllTopics: getAllTopicsService,
	getTopicBySlug: getTopicBySlugService,
} = require('../services/topic_services');

exports.getAllTopics = async (req, res) => {
	const topics = await getAllTopicsService();

	res.status(200).send({ topics });
};

exports.getTopicBySlug = async (req, res) => {
	const { slug } = req.params;
	const topic = await getTopicBySlugService(slug);
	if (!topic) return res.status(404).send({ msg: 'Topic not found' });
	res.status(200).send({ topic });
};
