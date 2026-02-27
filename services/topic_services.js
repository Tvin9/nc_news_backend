const { getAllTopics, getTopicBySlug } = require('../models/topics_model');

exports.getAllTopics = () => {
	return getAllTopics();
};

exports.getTopicBySlug = (slug) => {
	return getTopicBySlug(slug);
};
